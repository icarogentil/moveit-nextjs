import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesContextDta {
    level: number; 
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChanllenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextDta);

export function ChallengesProvider({ 
    children, 
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0); 
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0); 
    const [activeChallenge, setActiveChanllenge] = useState(null)
    const [levelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()  => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setLevelUpModalOpen(true);
    }

    function startNewChanllenge() {
        const randowChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randowChallengeIndex];
        setActiveChanllenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChanllenge(null)
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChanllenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function closeLevelUpModal() {
        setLevelUpModalOpen(false)
    }

    return (
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience,
            challengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChanllenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            }}
            >
            {children}

            {levelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}