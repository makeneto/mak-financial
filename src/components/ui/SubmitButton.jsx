export default function SubmitButton({ children }) {

    return (
        <button className="learn-more">
            <span aria-hidden="true" className="circle">
                <span className="icon arrow"></span>
            </span>
            <span className="button-text">{children}</span>
        </button>
    )
}
