import '../css/Success.css'
interface SuccessProps {
    headingtext: string, footerText: string, msg: string,
}


export default function Success(props: SuccessProps): React.ReactElement {
    return (
        <main className='d-flex justify-content-center align-items-center m-2 p-3'>
            <h1 className='align-text-center'>{props.headingtext}</h1>
            {props.msg}
            <br />
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            {props.footerText}
        </main>
    )
}
