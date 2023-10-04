import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Success from '../components/Success'
import { HOME } from '../constants/links'

const ThankYou = () => {
    const headertxt = `Thank You`
    const msg = " Your Order has been placed."
    const fotter = `It will be deliverd in a few days.`

    return (
        <div className='d-flex align-items-center justify-content-center'>
            <Success footerText={fotter} msg={msg} headingtext={headertxt} />
            <Link to={HOME.to}>
                <Button variant='primary'>Go To {HOME.text}</Button>
            </Link>
        </div>
    )
}

export default ThankYou