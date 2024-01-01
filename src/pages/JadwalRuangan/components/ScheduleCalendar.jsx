import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function ScheduleCalendar({currentDate, onDateUpdate, calendarDate, onCalendarDateUpdate, readOnly, markedDates}) {
  currentDate = currentDate || new Date();
  calendarDate = calendarDate || currentDate;
  function setCurrentDate(newDate) {
    if (readOnly !== undefined && readOnly == true) return;
    onDateUpdate(newDate);
  }

  function setCalendarDate(newDate) {
    onCalendarDateUpdate(newDate);
  }

  function updateDateSelection(newDate) {
    setCurrentDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), newDate));
  }

  const daysInMonth = (month) => {
    const year = calendarDate.getFullYear();
    return new Date(year, month, 0).getDate();
  };

  const startDay = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(calendarDate.getMonth() + 1);
    const prevTotalDays = daysInMonth(calendarDate.getMonth());
    const firstDay = startDay();
    const viewCurrentMonth = calendarDate.getFullYear() === currentDate.getFullYear() && calendarDate.getMonth() === currentDate.getMonth();
    const days = [];

    for (let i = 1; i <= totalDays + firstDay; i++) {
      if (i <= firstDay) {
        days.push(<div key={i} className="text-gray-400 flex items-center justify-center aspect-square">{prevTotalDays - (firstDay - i)}</div>);
      } else {
        let dateStyle = ""
        const thisDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), i - firstDay).getTime();

        if (viewCurrentMonth && i - firstDay === currentDate.getDate()) {
          dateStyle = "bg-green-400 font-medium rounded-full"
        }
        if (markedDates) {
          markedDates.forEach((occupiedDate) => {
            occupiedDate = {
              ...occupiedDate,
              start: new Date(occupiedDate.start),
              end: new Date(occupiedDate.end)
            }
            let bgColor = {
              "occupied": "bg-red-400",
              "selected": "bg-blue-400"
            }[occupiedDate.state]

            if (occupiedDate.start.setHours(0, 0, 0, 0) == thisDate) {
              console.log(occupiedDate.start.setHours(0, 0, 0, 0), occupiedDate.end.setHours(0, 0, 0, 0))
            }
            
            if (occupiedDate.start.setHours(0, 0, 0, 0) == occupiedDate.end.setHours(0, 0, 0, 0) && occupiedDate.start.setHours(0, 0, 0, 0) == thisDate) {
              dateStyle = `rounded-full ${bgColor}`
            } else if (occupiedDate.start.setHours(0, 0, 0, 0) == thisDate) {
              dateStyle = `rounded-l-full ${bgColor}`
            } else if (occupiedDate.end.setHours(0, 0, 0, 0) == thisDate) {
              dateStyle = `rounded-r-full ${bgColor}`
            } else if (occupiedDate.start.setHours(0, 0, 0, 0) < thisDate && occupiedDate.end.setHours(0, 0, 0, 0) > thisDate) {
              dateStyle = `${bgColor}`
            }
          })
        }

        days.push(
        <div
          key={i}
          className={"text-black flex items-center justify-center aspect-square cursor-pointer " + dateStyle} 
          onClick={() => updateDateSelection(i - firstDay)}
        >{i - firstDay}</div>
        );
      }
    }

    const restOfTheDays = 7 - (totalDays + firstDay) % 7;
    for (let i = 1; i <= restOfTheDays; i++) {
      days.push(<div key={i + 100} className="text-gray-300 px-0. flex items-center justify-center aspect-square">{i}</div>);
    }
    return days;
  };

  return (
    <div className="w-80 h-fit text-center p-4 mx-2 bg-neutral-100 rounded-sm font-light">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1))}><MdChevronLeft size="32px"/></button>
        <div>
          {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1))}><MdChevronRight size="32px"/></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-8">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="grid grid-cols-7 text-center h-fit">
        {renderCalendar()}
      </div>
    </div>
  );
} 