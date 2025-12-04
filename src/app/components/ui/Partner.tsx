const Partner = (props: partnerProps) => {
    return (
        <div className={`flex items-center gap-2.5 py-2`}>
            <div
                style={{
                    backgroundColor: `#${props.color}`,
                    color:
                        props.color.toLowerCase() === "ffffff"
                            ? "#000000"
                            : "#ffffff",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-3xl p-2.5 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25),inset_0px_1px_0px_0px_rgba(255,255,255,0.3),inset_0px_-2px_0px_0px_rgba(0,0,0,0.3),inset_0px_0px_15px_0px_rgba(255,255,255,0.1)]"
            >
                {props.name[0].toUpperCase()}
            </div>

            <div>{props.name}</div>
        </div>
    );
};

export interface partnerProps {
    name: string;
    color: string;
    onClick?: () => void;
}
export { Partner };
