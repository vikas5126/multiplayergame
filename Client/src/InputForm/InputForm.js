import React from "react";
import styles from "./InputForm.module.css"
import { useRef } from "react";

export default function InputForm ({setPlayerName, setPlayOnline, socket}) {
    const inputName = useRef();
    
    const handleSubmit = ()=>{
        if(inputName.current.value !== ""){
            setPlayerName(inputName.current.value);
            document.getElementById("form").style.display = "none";
            socket?.emit("request_to_play", {
                playerName: inputName.current.value
            })
        }
        else{
            alert("Please Enter Name");
        }
    }

    const handleCancle = () => {
        setPlayOnline(false);
        document.getElementById("form").style.display = "none";
    }
    return (
        <>
        <div className={styles.form} id="form">
            <h1>Player Name</h1>
            <input type="text" placeholder="Enter your name" ref={inputName} required/>
            <div className={styles.buttonContainer}>
                <button className={styles.ok} onClick={handleSubmit}> okay</button>
                <button className={styles.cancel} onClick={handleCancle}> cancel </button>
            </div>
        </div>
        </>
    )
}