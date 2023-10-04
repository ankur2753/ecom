import '../css/Profile.css'
import SavedAddress from '../components/SavedAddress';
import SavedCards from '../components/SavedCards';
import { useSelector } from 'react-redux';
import { IReduxState } from '../constants/interfaces';

const Profile: React.FC = () => {
    const UserID = useSelector((state: IReduxState) => state.UserId)
    return (
        <main className='profile'>
            <img className='avatar' src={`https://robohash.org/${"UserNo" + UserID}`} alt='profile' />
            <div className="info">
                <SavedAddress />
                <SavedCards />
            </div>
        </main>
    )
}

export default Profile