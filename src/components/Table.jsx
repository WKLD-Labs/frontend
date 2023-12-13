export function Table({children}) {
    return (
        <table className="h-fit w-full border-separate border-spacing-x-0 border-spacing-y-2">
        {children}
        </table>
    )
}

export function TableHeader({children}) {
    return (
        <thead>
            <tr className="text-lg text-left h-4">
                {children.map((e, i) => {
                    return (
                        <th className={`border-b border-black ${i == 0 ? "pl-8" : "px-2"} font-normal`}>{e}</th>
                    )
                })}
            </tr>
        </thead>
    )
}

export function TableBody({children}) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

export function TableRow({children, onClick}) {
    return (
        <tr className="bg-asegrey rounded-lg bg-opacity-10 hover:bg-opacity-20" onClick={onClick}>
            {children.map((e, i) => {
                let classes = "py-4 px-2";
                if (i == 0) {
                    classes = "rounded-l-lg py-4 pl-8 pr-2"
                } else if (i == children.length - 1) {
                    classes = "rounded-r-lg py-4 px-2"
                }
                return (
                    <td className={classes}>{e}</td>
                )
            })}
        </tr>
    )
}

export function TableCol({children}) {
    return children
}