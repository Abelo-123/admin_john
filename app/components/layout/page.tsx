"use client"
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useUser } from '../UserContext'; // Adjust the path as necessary
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useNot } from '../StatusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';



const Lays = () => {
    //const [notificationModal, seeNotificationModal] = useState(false)
    const { userData } = useUser();
    //const [notificationMessage, setNotificationMessage] = useState([])
    const { useNotification } = useNot();

    const { setNotification } = useNot();
    const [balance, setBalance] = useState(0.0)

    const [marq, setMarq] = useState('')

    useEffect(() => {
        const fetchMarq = async () => {

            const { data: setNotify, error: setError } = await supabase
                .from('adminmessage')
                .select('message')
                .eq('to', 'Admin')
                .eq('father', 6528707984)
                .single()

            if (setError) {
                console.error('Error fetching initial balance:', setError)
            } else {
                setMarq(setNotify.message)
            }
        }
        fetchMarq();
    }, [])

    useEffect(() => {
        const fetchBalance = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('balance')
                .eq('id', userData.userId)
                .single(); // Get a single row

            if (error) {
                console.error('Error fetching initial balance:', error);
            } else {
                setBalance(data.balance); // Set initial balance
            }
        }
        fetchBalance()
        supabase
            .channel(`users:id=eq.${userData.userId}`)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${userData.userId}` }, (payload) => {
                setBalance((payload.new as { balance: number }).balance); // Update balance on real-time changes

            })
            .subscribe();
    }, [])


    const seeNotification = async () => {



        setNotification((prevNotification) => ({
            ...prevNotification, // Spread the previous state
            notificationModal: true,
            smmModal: true,
            // Update the `deposit` field
        }));

        const { data: setNotify, error: setError } = await supabase
            .from('adminmessage')
            .select('*')
            .eq('to', 7786592015)
            .eq('father', 779060335)




        if (setError) {
            console.error('Error fetching initial balance:', setError);
        } else {
            const { error: setError } = await supabase
                .from("adminmessage")
                .update({ seen: true })
                .eq('to', 7786592015)
                .eq('father', 779060335)


            if (setError) {
                console.error('Error fetching initial balance:', setError);
            } else {
                setNotification((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    notificationLoader: false,
                    notificationData: setNotify,
                    notificationLight: false,
                    // Update the `deposit` field
                }));
            }
        }



        const { error: errorb } = await supabase.from('adminmessage').update({ seen: false }).eq('to', userData.userId); // Update all rows where `did` is greater than 0
        if (errorb) {
            console.error(errorb.message)
        }
    }

    return (<>
        <div className="flex ">
            <div className="flex w-full " style={{ 'paddingTop': '20px', 'paddingLeft': '20px' }}>
                <div className='flex'>
                    <Avatar
                        size={48}
                        src={userData.profile}
                    />

                    <div className='flex flex-col justify-space-around mt-auto  ml-3'>
                        <Text weight="2">{userData.firstName} {userData.lastName}</Text>
                        <Text weight="3" style={{ 'fontSize': '13px' }}>Balance: {balance}</Text>
                    </div>
                </div>
                <div onClick={seeNotification} style={{ position: 'relative' }} className="grid place-content-center ml-auto mr-8 ">
                    <div className="flex">
                        <FontAwesomeIcon size="2x" icon={faBell} />
                        {useNotification.notificationLight === true ? (
                            <div style={{ position: 'absolute', right: '0', padding: '4rem', height: '0.4rem', borderRadius: '100px', background: 'red' }}></div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>

        </div>
        <marquee style={{ marginTop: '0.5rem' }}>
            <Text style={{ color: 'var(--tgui--hint_color)' }}>{marq}</Text></marquee>

    </>);
}

export default Lays;