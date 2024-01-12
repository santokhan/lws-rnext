export const Col = ({ children, className }) => {
    return (
        <td class={["p-5 text-sm md:text-xl text-left", className].join(" ")}>
            {children}
        </td>
    )
}