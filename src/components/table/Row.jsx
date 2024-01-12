export const Row = (props) => {
    const { name, score, percentage, avator, className } = props;

    return (
        <tr class={["border-b", props.className].join(" ")}>
            <Col>{idx + 1}</Col>
            {
                name &&
                <Col>
                    <div class="flex space-x-3 items-center">
                        <img
                            class="w-8 h-8"
                            src={avator}
                            width="32"
                            height="32"
                            alt="John Smith"
                        />
                        <span class="whitespace-nowrap">{name}</span>
                    </div>
                </Col>
            }
            {score && <Col>{score}</Col>}
            {percentage && <Col>{percentage}</Col>}
        </tr>
    )
}