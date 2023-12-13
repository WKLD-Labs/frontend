import { useState } from "react";

export default function ScheduleCalendar({ currentDate, onDateUpdate, readOnly, data }) {
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
        days.push(<div key={i} className="text-gray-400 flex justify-center aspect-square">{prevTotalDays - (firstDay - i)}</div>);
      } else {
        const events=[];
        if(data[date.getMonth()+1]){
          if(data[date.getMonth()+1][i-firstDay]){
            data[date.getMonth()+1][i-firstDay].forEach(element => {
              events.push(<span>{element.time} {element.nama}</span>)
            });
          }
        }
        days.push(
          <div
            key={i}
            className={"text-black flex  justify-center aspect-square rounded-full cursor-pointer w-full " }
            onClick={() => updateDateSelection(i - firstDay)}>
            <span className={"flex flex-row justify-center rounded-full items-center h-8 p-1 aspect-square "+ (viewCurrentMonth && i - firstDay === currentDate.getDate() ? " bg-green-400 font-medium " : "")}>{i - firstDay}</span><div class="absolute flex-col pt-10 font-light">{events}</div></div>
        );
      }
    }

    const restOfTheDays = 7 - (totalDays + firstDay) % 7;
    for (let i = 1; i <= restOfTheDays; i++) {
      days.push(<div key={i + 100} className="text-gray-300 flex justify-center aspect-square">{i}</div>);
    }
    return days;
  };

  return (
    <div className="h-fit text-center p-4 mx-32 my-4  bg-neutral-100 rounded-md font-light border">
      <div className="flex flex-row items-center mb-7 justify-between">
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))} type="button" class="bg bg-aseorange border-aseorange text-white border p-2 font-light rounded-2xl px-4 w-32 h-fit ">Prev</button>
        {/*}
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}><MdChevronLeft size="32px" /></button>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}><MdChevronRight size="32px" /></button>
        {*/}
        <div class="font-semibold">
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))} type="button" class="bg bg-aseorange border-aseorange text-white border p-2 font-light rounded-2xl px-4 w-32 h-fit">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center h-fit">
        {renderCalendar()}
      </div>
    </div>
  );
}

