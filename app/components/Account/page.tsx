"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/app/lib/supabaseClient"
import { Button, Input, Select } from "@telegram-apps/telegram-ui"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useUser } from '../UserContext';
import axios from "axios";
import MyLoader from "../Loader/page";
import Swal from "sweetalert2";

const Account = () => {

    const { setUserData, userData } = useUser()
    const [modalA, setModalA] = useState(false)
    const [modalB, setModalB] = useState(false)
    const [modalC, setModalC] = useState(false)
    const [modalD, setModalD] = useState(false)
    const [modalE, setModalE] = useState(false)
    const [modalF, setModalF] = useState(false)
    const [modalG, setModalG] = useState(false)
    const [modalH, setModalH] = useState(false)
    const [modalJ, setModalJ] = useState(false)

    const [all, setAll] = useState(null)
    const [indi, setIndi] = useState(null)
    const [adminMessageFor, setAdminMessageFor] = useState(null)
    const [adminMessageFor2, setAdminMessageFor2] = useState(null)
    const [adminMessage, setAdminMessage] = useState(null)
    const [rate, setRate] = useState(null)
    const [allrate, setallRate] = useState(null)
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [filteredServices, setFilteredServices] = useState([]);
    const [services, setService] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [iframeVisible, setIframeVisible] = useState(false)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [iframeKey, setIframeKey] = useState(0);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [tg, setTg] = useState('')
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [depo, setDepo] = useState([])
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [depoo, setDepoo] = useState([])
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [loadingb, setLoaderb] = useState(false)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [amount, setAmount] = useState(null)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [bank, setBank] = useState(null)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [loader, setLoader] = useState(false)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [amounto, setAmounto] = useState([])
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [acc, setAcc] = useState(null)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [accountname, setAccountname] = useState('')
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [withdrawls, setWithdrawldata] = useState([])
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [withdrawlo, setWithdrawldatao] = useState([])
    const [depositmin, setDeposit] = useState(null)
    const [loadingc, setLoadingc] = useState(false);

    const [rr, setRr] = useState(null)
    const [mm, setMm] = useState(null)
    const [arr, setAllrate] = useState(null)
    const sendAdminMessage = async () => {
        setIndi(null)
        setLoadingc(true);
        if (!adminMessageFor && !adminMessageFor2 && all == "admin") { //all admin

            const { error: findErrorB } = await supabase.from('adminmessage').update({ message: adminMessage, seen: null }).eq('to', 'Admin').eq('father', 6528707984); // Update all rows where `did` is greater than 0
            if (findErrorB) {
                console.error(findErrorB.message)
            } else {
                setAdminMessageFor('')
                setAdminMessageFor2('')
                setAdminMessage('')
                setAll('')
                setModalA(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Message sent to all admin.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal2-popup',    // Apply the custom class to the popup
                        title: 'swal2-title',    // Apply the custom class to the title
                        confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                        cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                    }
                });
                setLoadingc(false);
            }

        } else if (!adminMessageFor && adminMessageFor2) { //specific user

            const { error } = await supabase
                .from('users')
                .select('id')
                .eq("father", adminMessageFor2)
                .single()



            if (error) {
                alert(error);
            } else {
                const { error } = await supabase
                    .from('adminmessage')
                    .insert([
                        {
                            message: adminMessage, // Replace with your dynamic value if needed
                            for: adminMessageFor2, // Replace with the desired value for the "for" column
                            from: "Admin",
                            father: 6528707984,
                        }
                    ]);
                if (!error) {
                    const { error: findErrorB } = await supabase.from('adminmessage').update({ seen: true }).eq('for', adminMessageFor).eq('father', 6528707984).gt('id', 0); // Update all rows where `did` is greater than 0
                    if (findErrorB) {
                        console.error(findErrorB.message)
                    } else {

                        setAdminMessageFor('')
                        setAdminMessageFor2('')
                        setAdminMessage('')
                        setAll('')
                        setModalA(false)
                        setLoadingc(true);
                    }
                }
            }
        } else if (adminMessageFor && !adminMessageFor2) { //specici admin
            const { error } = await supabase
                .from('adminmessage')
                .insert([
                    {
                        message: adminMessage, // Replace with the desired value for the "for" column
                        from: "Admin", // Replace with the desired value for the "from" column
                        to: adminMessageFor,
                        seen: true,
                        father: 6528707984
                    }
                ]);

            if (error) {
                console.error("Error inserting into adminmessage:", error);
            } else {
                setAdminMessageFor('')
                setAdminMessageFor2('')
                setAdminMessage('')
                setAll('')
                Swal.fire({
                    title: 'Success!',
                    text: 'Message sent to admin.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal2-popup',    // Apply the custom class to the popup
                        title: 'swal2-title',    // Apply the custom class to the title
                        confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                        cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                    }
                });
                setModalA(false)
                setLoadingc(true);
            }
        } else if (!adminMessageFor && !adminMessageFor2 && all == "user") { //all use
            const { error: findErrorB } = await supabase.from('adminmessage').update({ message: adminMessage, seen: null }).eq('father', 6528707984).eq('to', 'User').eq('for', 'all'); // Update all rows where `did` is greater than 0
            if (findErrorB) {
                console.error(findErrorB.message)
            } else {
                setAdminMessageFor('')
                setAdminMessageFor2('')
                setAdminMessage('')
                setAll('')
                Swal.fire({
                    title: 'Success!',
                    text: 'Message sent to all user.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal2-popup',    // Apply the custom class to the popup
                        title: 'swal2-title',    // Apply the custom class to the title
                        confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                        cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                    }
                });
                setModalA(false)
                setLoadingc(true);
            }
        }
        // else if (!adminMessageFor && !adminMessageFor2 && all == "adminuser") { //all user and admin
        //     const { error } = await supabase
        //         .from('adminmessage')
        //         .insert([
        //             {
        //                 message: adminMessage, // Replace with your dynamic value if needed
        //                 for: 'all', // Replace with the desired value for the "for" column
        //                 from: "Admin",
        //                 father: 7786592015,
        //                 to: "Admin"
        //             }
        //         ]);

        //     if (error) {
        //         console.error("Error inserting into adminmessage:", error);
        //     } else {
        //         const { error: findErrorB } = await supabase.from('adminmessage').update({ seen: true }).eq('father', userData.userId).eq('for', 'all').gt('id', 0); // Update all rows where `did` is greater than 0
        //         if (findErrorB) {
        //             console.error(findErrorB.message)
        //         } else {
        //             window.alert("sending all users")
        //             setAdminMessageFor('')
        //             setAdminMessageFor2('')
        //             setAdminMessage('')
        //             setAll('')
        //         }
        //     }
        // }




    }
    const updateRate = async () => {
        setLoadingc(true);
        const { error: findErrorC } = await supabase.from('panel').update({ value: rate }).eq('owner', 6528707984).eq('key', 'rate'); // Update all rows where `did` is greater than 0
        if (findErrorC) {
            console.error(findErrorC.message)
        } else {
            Swal.fire({
                title: 'Success!',
                text: 'Rate updated.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
            setLoadingc(false);
            setModalB(false)
        }
    }
    const updateAllRate = async () => {
        setLoadingc(true);
        const { error: findErrorC } = await supabase.from('panel').update({ allrate: allrate }).gt('id', 0); // Update all rows where `did` is greater than 0
        if (findErrorC) {
            console.error(findErrorC.message)
        } else {
            setallRate(null)
            Swal.fire({
                title: 'Success!',
                text: 'All Rate updated.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
            setLoadingc(false);
            setModalH(false)

        }
    }

    useEffect(() => {
        const deposit = async () => {

            // Fetch the initial data (orders) from Supabase or any other source
            const { data: depositForEach, error } = await supabase
                .from("admin_deposit")
                .select("*")

            if (error) {
                console.log(error);
            } else {
                setDepo(depositForEach)



                const { data: recentDisabled, error } = await supabase
                    .from("panel")
                    .select("bigvalue")
                    .eq("owner", 6528707984)



                if (error) {
                    console.log(error);
                } else {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        recentDisabled: recentDisabled[0].bigvalue, // Append new value to the array

                        // Update the `deposit` field
                    }));
                    console.log(recentDisabled[0].bigvalue)
                }




            }
        };

        deposit();
    }, [])


    useEffect(() => {
        // Filter services whenever the search query changes
        setLoading(true);
        const timer = setTimeout(() => {
            const filtered = services.filter((items) =>
                items.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                String(items.service).toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredServices(filtered);
            setLoading(false);
        }, 100); // Debounce for better performance

        return () => clearTimeout(timer);
    }, [searchQuery, services]);

    useEffect(() => {
        const fetchServices = async () => {

            try {
                const response = await axios.get('/api/smm/fetchService');
                console.log(response.data.response)
                setService(response.data.response); // Store all services
                // Initially, show all services
            } catch (error) {
                console.error('Error fetching services:', error);
            }


        };

        fetchServices();
    }, []);



    useEffect(() => {
        supabase
            .channel("panl_channel")
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "panel" }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state
                if (payload.new.owner === userData.userId && payload.new.key === 'disabled') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        recentDisabled: [...prevNotification.recentDisabled, payload.new.bigvalue], // Append new value to the array

                        // Update the `deposit` field
                    }));
                }

                //console.log(payload.new)
            })
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_amount" }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state


                setAmounto((prevWith) => (
                    [...prevWith, { status: payload.new.status, date: payload.new.date, wid: payload.new.wid, for: payload.new.for, bank: payload.new.bank, a_name: payload.new.a_name, a_no: payload.new.a_no, amount: payload.new.amount }]

                ))



                console.log(payload.new)
            })
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_deposit" }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state


                // setDepoo((prevWith) => (
                //     [...prevWith, { date: payload.new.date, tid: payload.new.tid, admin: payload.new.admin, amount: payload.new.amount }]

                // ))



                console.log(payload.new)
            })






            .subscribe();
    }, [])

    const getServiceName = (serviceId) => {
        const foundService = services.find((s) => s.service === serviceId); // Match by serviceId
        return foundService ? foundService.name : "Unknown Service"; // Return name or fallback
    };

    const handleEnable = async (id) => {

        try {
            // Fetch the current 'bigvalue' data from the 'panel' table
            const { data, error } = await supabase
                .from('panel')
                .select('bigvalue')
                .eq('key', 'disabled')
                .eq('owner', 6528707984)// Filter based on the 'father' or any other condition
                .single();

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            // Split the bigvalue into an array
            let bigValueArray = String(data.bigvalue || "").split(",");

            // Filter out the ID from the array (if necessary)
            bigValueArray = bigValueArray.filter((item) => item !== id.toString());

            // Join the array back into a comma-separated string
            const updatedBigValue = bigValueArray.join(",");
            setUserData((prevNotification) => ({
                ...prevNotification, // Spread the previous state
                recentDisabled: updatedBigValue, // Remove the ID from the array
            }));
            // Update the 'bigvalue' column in the 'panel' table
            const { error: updateError } = await supabase
                .from('panel')
                .update({ bigvalue: updatedBigValue })
                .eq('owner', 6528707984)// Filter by correct row

            if (updateError) {
                console.error('Error updating bigvalue:', updateError);
            } else {


                console.log('Bigvalue updated successfully');

                // Now update `recentDisabled` in the userData state
                setUserData((prevNotification) => {
                    // Split current recentDisabled and remove duplicates
                    const recentDisabledArray = [
                        ...new Set(String(prevNotification.recentDisabled || "").split(",")),
                        ...bigValueArray, // Add the updated bigValueArray
                    ];

                    // Join the array back into a string and update the state
                    return {
                        ...prevNotification,
                        recentDisabled: recentDisabledArray.join(","),
                    };
                });
            }
        } catch (error) {
            console.error('Error in handleEnable:', error);
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase()); // Update search term
    };

    const handleDisable = async (id) => {
        try {
            // Fetch the current value of "bigvalue" from the "panel" table

            setUserData((prevNotification) => ({
                ...prevNotification, // Spread the previous state
                recentDisabled: [...prevNotification.recentDisabled, `${userData.recentDisabled},${id}`], // Append new value to the array

                // Update the `deposit` field
            }));
            let updatedValue = id;

            // Append the new value to the existing data if it exists
            if (userData.recentDisabled) {
                updatedValue = `${userData.recentDisabled},${id}`;
            }

            console.log(updatedValue)

            // Update the "bigvalue" column in the "panel" table
            const { error: updateError } = await supabase
                .from('panel')
                .update({ bigvalue: updatedValue })
                .eq('owner', 6528707984)
                .eq('key', 'disabled')

            if (updateError) throw updateError;


            console.log('Updated sccessfully:', updatedValue);
        } catch (error) {
            console.error('Error updating bigvalue:', error.message);
        }
    }


    const send = async (mess) => {

        const { error } = await supabase.from('admin_deposit').insert([
            { tid: mess, amount: 3000, status: 'Pending', father: userData.userId }
        ]);
        if (error) {
            console.error(error.message)
        } else {
            // setModalE(false)

            setDepoo((prevData) => [...prevData, {
                status: "Pending",
                date: new Date().toISOString(),
                tid: mess,
                amount: 3000
            }]);
        }
    }


    useEffect(() => {
        const handleMessage = (event) => {
            // Validate the origin to ensure the message is from the expected source
            if (event.origin !== 'https://paxyo.com') return;

            const { type, message } = event.data;

            // Handle different message types
            if (type === 'payment-success') {
                //console.log(message); // e.g., "Payment was successful!"
                // setModalE(false)
                //setAgain(true); // Set to true to show the container
                setIframeVisible(false); // Make iframe visible again
                Swal.fire({
                    title: 'Success!',
                    text: 'The operation was successful.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal2-popup',    // Apply the custom class to the popup
                        title: 'swal2-title',    // Apply the custom class to the title
                        confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                        cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                    }
                });


                send(message);



            } else if (type === 'payment-failure' || type === 'payment-closed') {
                //console.error(message); // Handle failure or closed event
                // setChapa(false)
                setTg(message)
                // Hide container and show iframe
                setIframeVisible(false);


                // Hide iframe on failure or closed event

            } else if (type === 'payment-closed') {
                //setChapa(false)
                setTg(message)
                //  console.log(message); // e.g., "Payment popup closed."
                setIframeVisible(false);

                // Hide iframe on close

            }
        };

        // Add the message listener
        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);



    const updateDeposit = async () => {
        setLoadingc(true);
        const { error: findErrorB } = await supabase.from('panel').update({ minmax: depositmin }).eq('owner', 6528707984).eq('key', 'minmax'); // Update all rows where `did` is greater than 0
        if (findErrorB) {
            console.error(findErrorB.message)
        } else {
            Swal.fire({
                title: 'Success!',
                text: 'Minimum Seted',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
            setLoadingc(false);
            setModalG(false)

        }
    }

    const sendDepositdf = async (id) => {
        const { error: findErrorB } = await supabase.from('admin_withdrawl').update({ status: 'Sent' }).eq('wid', id); // Update all rows where `did` is greater than 0
        if (findErrorB) {
            console.error(findErrorB.message)
        } else {
            setWithdrawldatao((prevWith) =>
                prevWith.map((item) =>
                    item.wid === id
                        ? { ...item, status: 'Sent' } // Update status to 'sent' if wid matches id
                        : item // Keep the other items unchanged
                )
            );

        }
    }


    return (
        <>

            <div className="grid  gap-2 grid-row-2  px-12 w-full p-2">
                <div className="p-2 h-fit   ">
                    <Button onClick={() => setModalA(true)} className="w-full">Message</Button>
                </div>
                <div className="p-2 h-fit flex gap-2">
                    <Button onClick={async () => {
                        setModalB(true)
                        const { data: fetchRate, error } = await supabase
                            .from("panel")
                            .select("value")
                            .eq('owner', 6528707984)
                            .eq('key', 'rate')


                        if (error) {
                            console.log(error);
                        } else {
                            setRr(fetchRate[0].value)
                        }

                    }} className="w-full">Rate</Button>
                    <Button onClick={async () => {
                        const { data: fetchRate, error } = await supabase
                            .from("panel")
                            .select("allrate")
                            .eq('owner', 6528707984)



                        if (error) {
                            console.log(error);
                        } else {
                            setAllrate(fetchRate[0].allrate)
                        }
                        setModalH(true)
                    }} className="w-full">Rate</Button>
                </div>

                <div className="p-2 h-fit flex gap-2 ">
                    <Button onClick={() => setModalC(true)} className="w-full">Disable</Button>
                    <Button onClick={() => setModalD(true)} className="w-full ">Enable</Button>
                </div>
                <div className="p-2 h-fit flex gap-2">
                    <Button onClick={async () => {
                        setTg('')
                        setModalE(true)
                        const { data: depositForAdmin, error } = await supabase

                            .from("admin_deposit")
                            .select("*")

                        if (error) {
                            console.log(error);
                        } else {
                            setDepoo(depositForAdmin)
                        }
                    }
                    } className="w-full">Deposit</Button>
                    <Button onClick={async () => {
                        setModalF(true)
                        const { data: withdrawlForAdmin, error } = await supabase
                            .from("admin_withdrawl")
                            .select("*")

                        if (error) {
                            console.log(error);
                        } else {
                            setWithdrawldatao(withdrawlForAdmin)
                        }
                    }
                    } className="w-full">Withdrawl</Button>
                </div>
                <div className="p-2 h-fit  ">
                    <Button onClick={async () => {
                        const { data: amountForAdmin, error } = await supabase
                            .from("admin_amount")
                            .select("*")

                        if (error) {
                            console.log(error);
                        } else {
                            setAmounto(amountForAdmin)
                        }
                        setModalJ(true)
                    }
                    } className="w-full">Amount</Button>
                </div>
                <div className="p-2 h-fit ">
                    <Button onClick={async () => {
                        setModalG(true)
                        const { data: fetchRate, error } = await supabase
                            .from("panel")
                            .select("minmax")
                            .eq('owner', 6528707984)


                        if (error) {
                            console.log(error);
                        } else {
                            setMm(fetchRate[0].minmax)
                        }
                    }} className="w-full">min Deposit</Button>
                </div>


            </div >
            {modalA && (
                <div
                    className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                    onClick={() => {

                        setIndi(null)
                        setModalA(false)
                    }}
                >
                    <div
                        className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                        onClick={(e) => e.stopPropagation()}
                        style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                    // Prevent clicking inside the modal from closing it
                    >
                        <div

                            className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                            onClick={() => {
                                setIndi(null)
                                setModalA(false)
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>
                        <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Messages</h2>

                        <div className="amount-container">


                            <Select header="All" value={all} onChange={(e) => {
                                setAll(e.target.value)
                                setIndi(e.target.value)
                            }}>
                                <option value="">ID</option>
                                <option>admin</option>
                                <option>user</option>
                            </Select>

                            {!indi && (<Input
                                header="UserID"
                                type="number"
                                className="w-full"
                                placeholder="Enter user's id"
                                onChange={(e) => setAdminMessageFor2(e.target.value)}
                                value={adminMessageFor2}
                            />)}

                            {!indi && (<Input
                                header="AdminID"
                                type="number"
                                className="w-full"
                                placeholder="Enter admin's id"
                                value={adminMessageFor}
                                onChange={(e) => setAdminMessageFor(e.target.value)}
                            />)}


                            <Input
                                header="Message"
                                type="text"
                                className="w-full"
                                value={adminMessage}
                                placeholder="Enter message"
                                onChange={(e) => setAdminMessage(e.target.value)}
                            />

                            {/* <strong style={{ color: 'red' }}>
                                {aamount !== '' && parseInt(aamount) <= userData.deposit && `The Minimum Deposit Amount is ${userData.deposit}`}
                            </strong> */}
                            <Button

                                onClick={sendAdminMessage}
                                className="w-full p-4 flex"
                            // disabled={parseInt(aamount) <= userData.deposit || aamount === ''}
                            // style={{ display: but ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) >= userData.deposit ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                            >
                                {/* {(ag && again) ? "Try Again" : "Continue"} */}
                                <FontAwesomeIcon
                                    icon={faRefresh}
                                    className={loadingc ? "spin" : ""}
                                    style={{ marginRight: "8px", display: loadingc ? 'inline' : 'none', }} // Add spacing if needed
                                />
                                {loadingc ? "Sending..." : "Send"}
                            </Button>


                        </div>
                    </div>
                </div>
            )
            }
            {
                modalB && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setIndi(null)
                            setModalB(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {
                                    setIndi(null)
                                    setModalB(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Rate</h2>

                            <div className="amount-container">


                                <Input
                                    header="Rate"
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => setRate(e.target.value)}
                                    value={rate}
                                    placeholder={rr}
                                />

                                {/* <strong style={{ color: 'red' }}>
                                {aamount !== '' && parseInt(aamount) <= userData.deposit && `The Minimum Deposit Amount is ${userData.deposit}`}
                            </strong> */}
                                <Button

                                    onClick={updateRate}
                                    className="w-full p-4"
                                // disabled={parseInt(aamount) <= userData.deposit || aamount === ''}
                                // style={{ display: but ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) >= userData.deposit ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                                >
                                    {/* {(ag && again) ? "Try Again" : "Continue"} */}
                                    <FontAwesomeIcon
                                        icon={faRefresh}
                                        className={loadingc ? "spin" : ""}
                                        style={{ marginRight: "8px", display: loadingc ? 'inline' : 'none', }} // Add spacing if needed
                                    />
                                    {loadingc ? "Sending..." : "Send"}

                                </Button>


                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalC && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setModalC(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {

                                    setModalC(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Disable</h2>

                            <div style={{ height: '42rem' }} className="amount-container">

                                <Input
                                    header="Search"
                                    type="text"
                                    placeholder="Search by name or service..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />

                                <ul className="scrollable" style={{ height: '80%', overflowY: 'scroll', overflowX: 'hidden' }} >
                                    {loading ? (
                                        <li className="p-2 text-gray-500">Loading...</li>
                                    ) : (
                                        filteredServices
                                            .filter((items) => {
                                                const disabledArray = String(userData.recentDisabled || '').split(',');
                                                return !disabledArray.includes(String(items.service));
                                            })
                                            .map((items, index) => (
                                                <li key={index}>
                                                    <div
                                                        style={{ borderBottom: '1px solid black' }}
                                                        className="w-full p-2"
                                                    >
                                                        {items.service} {items.name}
                                                        <Button
                                                            className="px-6 p-2 ml-4 text-white"
                                                            onClick={() => handleDisable(items.service)}
                                                        >
                                                            Disable
                                                        </Button>
                                                    </div>
                                                </li>
                                            ))
                                    )}

                                </ul>


                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalD && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setModalD(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {

                                    setModalD(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Enable</h2>

                            <div style={{ height: '42rem' }} className="amount-container">

                                <Input
                                    header="Search"
                                    type="text"
                                    placeholder="Search by name or service..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />

                                <ul className="scrollable" style={{ height: '80%', overflowY: 'scroll', overflowX: 'hidden' }} >
                                    {[...new Set(String(userData.recentDisabled || "").split(","))] // Remove duplicates
                                        .filter((serviceId) => serviceId.length >= 2) // Filter by serviceId length >= 2
                                        .filter((serviceId) => {
                                            const serviceName = getServiceName(serviceId).toLowerCase(); // Get name and convert it to lowercase
                                            const serviceIdString = serviceId.toString().toLowerCase(); // Ensure serviceId is a string and lowercase for case-insensitive search

                                            return (
                                                serviceIdString.includes(searchTerm) || serviceName.includes(searchTerm) // Search by serviceId or name
                                            );
                                        })
                                        .map((serviceId, index) => (
                                            <li key={index}>
                                                <div className="w-full p-2 ">

                                                    <div
                                                        style={{ borderBottom: '1px solid black' }}
                                                        className="w-full p-2"
                                                    >
                                                        {serviceId} - {getServiceName(serviceId)}
                                                        <Button
                                                            className="px-6 p-2 ml-4 text-white"
                                                            onClick={() => handleEnable(serviceId)}
                                                        >
                                                            Enable
                                                        </Button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}

                                </ul>


                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalE && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setIndi(null)
                            setModalE(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {
                                    setIndi(null)
                                    setModalE(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">M. Depost</h2>

                            <div className="scrollable amount-container">


                                {loadingb && <MyLoader />}

                                {!loadingb &&
                                    <table style={{ width: "100%" }} className="  rounded-lg shadow-md">
                                        <thead>
                                            <tr>
                                                {/* <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                action
                                            </th> */}
                                                {/* 
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                status
                                            </th> */}
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    tid
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    amount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    admin
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className=" ">
                                            {depoo.map((items, index) => (
                                                <tr key={index}>

                                                    <td className="px-6 py-4 text-sm ">{items.tid}</td>

                                                    <td className="px-6 py-4 text-sm ">{items.date}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.amount}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.admin}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }

                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalF && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => setModalF(false)}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => setModalF(false)}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Withdrawl</h2>

                            <div className="scrollable amount-container">

                                {!loader &&
                                    <table style={{ width: "100%" }} className="  rounded-lg shadow-md">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    action
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    wid
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">bank</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    account name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">sccout number</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">father</th>

                                            </tr>
                                        </thead>
                                        <tbody className=" ">
                                            {withdrawlo.map((items, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 text-sm">
                                                        {items.status !== "Sent" && (
                                                            <button onClick={() => sendDepositdf(items.wid)}>add</button>
                                                        )}

                                                    </td>
                                                    <td className="px-6 py-4 text-sm">{items.status}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.wid}</td>

                                                    <td className="px-6 py-4 text-sm ">{items.amount}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.date}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.bank}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.a_name}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.a_no}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.for}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }

                            </div>
                            <br />


                        </div>
                    </div>
                )
            }
            {
                modalG && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setModalG(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {
                                    setModalG(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Minimum deposit</h2>

                            <div className="amount-container">


                                <Input
                                    header="Minimum"
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => setDeposit(e.target.value)} value={depositmin}
                                    placeholder={mm}
                                />

                                {/* <strong style={{ color: 'red' }}>
                                {aamount !== '' && parseInt(aamount) <= userData.deposit && `The Minimum Deposit Amount is ${userData.deposit}`}
                            </strong> */}
                                <Button

                                    onClick={updateDeposit}
                                    className="w-full p-4"
                                // disabled={parseInt(aamount) <= userData.deposit || aamount === ''}
                                // style={{ display: but ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) >= userData.deposit ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                                >
                                    {/* {(ag && again) ? "Try Again" : "Continue"} */}
                                    <FontAwesomeIcon
                                        icon={faRefresh}
                                        className={loadingc ? "spin" : ""}
                                        style={{ marginRight: "8px", display: loadingc ? 'inline' : 'none', }} // Add spacing if needed
                                    />
                                    {loadingc ? "Setting..." : "Set"}
                                </Button>


                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalH && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setModalH(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {
                                    setModalH(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">All rate</h2>

                            <div className="amount-container">


                                <Input
                                    header="Rate"
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => setallRate(e.target.value)}
                                    value={allrate}
                                    placeholder={arr}
                                />

                                {/* <strong style={{ color: 'red' }}>
                                {aamount !== '' && parseInt(aamount) <= userData.deposit && `The Minimum Deposit Amount is ${userData.deposit}`}
                            </strong> */}
                                <Button

                                    onClick={updateAllRate}
                                    className="w-full p-4"
                                // disabled={parseInt(aamount) <= userData.deposit || aamount === ''}
                                // style={{ display: but ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) >= userData.deposit ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                                >
                                    {/* {(ag && again) ? "Try Again" : "Continue"} */}
                                    <FontAwesomeIcon
                                        icon={faRefresh}
                                        className={loadingc ? "spin" : ""}
                                        style={{ marginRight: "8px", display: loadingc ? 'inline' : 'none', }} // Add spacing if needed
                                    />
                                    {loadingc ? "Setting..." : "Set"}
                                </Button>


                            </div>
                        </div>
                    </div>
                )
            }
            {
                modalJ && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={() => {

                            setModalJ(false)
                        }}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={() => {
                                    setModalJ(false)
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">A. Deposit</h2>

                            <div className="scrollable amount-container">


                                {loadingb && <MyLoader />}

                                {!loadingb &&
                                    <table style={{ width: "100%" }} className="  rounded-lg shadow-md">
                                        <thead>
                                            <tr>
                                                {/* <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                action
                                            </th> */}
                                                {/* 
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                status
                                            </th> */}
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    tid
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Admin</th>

                                            </tr>
                                        </thead>
                                        <tbody className=" ">
                                            {amounto.map((items, index) => (
                                                <tr key={index}>
                                                    {/* <td className="px-6 py-4 text-sm">
                                                    {items.status !== "Sent" && (
                                                        <button onClick={() => sendDeposita(items.tid)}>add</button>
                                                    )}

                                                </td>                                            */}
                                                    {/* <td className="px-6 py-4 text-sm">{items.status}</td> */}
                                                    <td className="px-6 py-4 text-sm ">{items.tid}</td>

                                                    <td className="px-6 py-4 text-sm ">{items.amount}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.created_at}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.father}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Account;