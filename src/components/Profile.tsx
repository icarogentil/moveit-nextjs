import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://scontent.fcpq4-1.fna.fbcdn.net/v/t31.0-8/29351861_1673221616094347_6365905745148239715_o.jpg?_nc_cat=111&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeGI9eK5j2iPJbZ6Re6nYWxVA3jYzEOQepsDeNjMQ5B6m0jeDeVSV4_F2ktd6C1Hf7HSOwMYfbPmX2r2ordgVbLY&_nc_ohc=FrrQQpI9v9AAX9du2vw&_nc_ht=scontent.fcpq4-1.fna&oh=35cc2682c79882683f98426512d5ac8b&oe=605B5AAD" 
            alt="Ícaro Gentil"
            width={200} />
            <div>
                <strong>Ícaro Gentil</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}