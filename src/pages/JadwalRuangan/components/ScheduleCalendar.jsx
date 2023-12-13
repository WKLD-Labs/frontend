import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function ScheduleCalendar({currentDate, onDateUpdate, readOnly, markedDates}) {
  const [date, setDate] = useState(currentDate || new Date());
  currentDate = currentDate || new Date();
  function setCurrentDate(newDate) {
    if (readOnly !== undefined && readOnly == true) return;
    onDateUpdate(newDate);
  }

  function updateDateSelection(newDate) {
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), newDate));
  }

  const daysInMonth = (month) => {
    const year = date.getFullYear();
    return new Date(year, month, 0).getDate();
  };

  const startDay = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(date.getMonth() + 1);
    const prevTotalDays = daysInMonth(date.getMonth());
    const firstDay = startDay();
    const viewCurrentMonth = date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth();
    const days = [];

    for (let i = 1; i <= totalDays + firstDay; i++) {
      if (i <= firstDay) {
        days.push(<div key={i} className="text-gray-400 flex items-center justify-center aspect-square">{prevTotalDays - (firstDay - i)}</div>);
      } else {
        let dateStyle = ""
        const thisDate = new Date(date.getFullYear(), date.getMonth(), i - firstDay).getTime();

        if (viewCurrentMonth && i - firstDay === currentDate.getDate()) {
          dateStyle = "bg-green-400 font-medium rounded-full"
        } else if (markedDates) {
          markedDates.forEach((occupiedDate) => {
            const bgColor = {
              "occupied": "bg-red-400",
              "selected": "bg-blue-400"
            }[occupiedDate.state]
            if (occupiedDate.start.setHours(0, 0, 0, 0) == thisDate) {
              if (viewCurrentMonth && i - firstDay == currentDate.getDate()-1 ) {
                dateStyle = `rounded-full ${bgColor}`
              } else {
                dateStyle = `rounded-l-full ${bgColor}`
              }
              
            } else if (occupiedDate.end.setHours(0, 0, 0, 0) == thisDate) {
              if (viewCurrentMonth &&  viewCurrentMonth && i - firstDay - 1 == currentDate.getDate()) {
                dateStyle = `rounded-full ${bgColor}`
              } else {
                dateStyle = `rounded-r-full ${bgColor}`
              }
              
            } else if (occupiedDate.start.setHours(0, 0, 0, 0) < thisDate && occupiedDate.end.setHours(0, 0, 0, 0) > thisDate) {
              if (viewCurrentMonth && i - firstDay == currentDate.getDate()-1) {
                dateStyle = `rounded-r-full ${bgColor}`
              } else if (viewCurrentMonth && i - firstDay - 1 == currentDate.getDate()) {
                dateStyle = `rounded-l-full ${bgColor}`
              } else {
                dateStyle = `${bgColor}`
              }
              
              
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
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}><MdChevronLeft size="32px"/></button>
        <div>
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}><MdChevronRight size="32px"/></button>
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