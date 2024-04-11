interface InputTextProps {
    label: string;
    valid: boolean;
    placeholder: string;
    spellCheck: boolean;
    value: string;
    handleOnChange: (value: string) => void;
}

export default function InputText(props: InputTextProps) {
    return <div className="flex flex-row font-light h-[5.5rem]">
        <span className="text-3xl text-black mt-7">{props.label}:</span>
        <input className={`w-[22rem] rounded-xl ml-3 pl-3 py-7 text-2xl items-center placeholder-[#B0B0B0] ${props.valid ? 'bg-cpc-gray' : 'bg-[#FF9F9F]'} inner-shadow-4`}
            type="text"
            placeholder={props.placeholder}
            spellCheck={props.spellCheck}
            value={props.value}
            onChange={(e) => props.handleOnChange(e.target.value)}
        />
    </div>;
}