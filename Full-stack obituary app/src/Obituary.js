import './index.css';
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

function Obituary() {

    const [mems, setMems] = useState([]);

    const memsRef = useRef(null);

    const descRef = useRef(null);

    
    const setDesc = () => {
        console.log("heya")
        console.log(mems.length)
        console.log("heya")
        if (mems.length === 0) {
            descRef.current.textContent = '* (since I used up all my free openAI prompts) :( *'
            descRef.current.style.fontWeight = 'bold'
            descRef.current.style.fontSize = '120%';
        }
        else {
            descRef.current.textContent = '* (since I used up all my free openAI prompts) :( *'
            descRef.current.style.fontWeight = 'bold'
            descRef.current.style.fontSize = '120%';
        }
    }
    

    const getUserMems = async () => {

        const res = await fetch(
            "https://otgo7lkhzai4qr3g5jtuqj4noa0irwgo.lambda-url.ca-central-1.on.aws/",
            {
                method: "GET"
            }
        );

        const jsonRes = await res.json()
        console.log(jsonRes)
        console.log("retrieved from db")

        const modifiedMems = jsonRes.map((mem) => {
            return {
                ...mem
            }
        })

        console.log("Start mems:")
        console.log(modifiedMems)
        console.log("End mems:")

        setMems(modifiedMems)

    }

    useEffect(() => {
        getUserMems();
    }, []);

    useEffect(() => {
        setDesc();
    }, [mems]);
    
    const navigate = useNavigate()

    const newObituary = () => {

        navigate("/create")

    }


    return (
        <>
        <div class = "header-cont">
            <div class = "header-title"></div>
            <div class = "header-title">
                <div id = "title"><b>Anime Obituary Service</b></div>
                <div id = "title-desc" ref = {descRef}><b> * Website no longer generates obituaries * </b></div>
                <div id = "title-desc" ref = {descRef}><b></b></div>
            </div>
            <div class = "header-button">
                <button id = "create-button" onClick={newObituary}><u>&#43; New Obituary &#129702;</u></button>
            </div>
        </div>

        <div class = "body-cont" ref = {memsRef}>
            {mems.map((mem, index) => (
                <div class="mem" key={index} onClick={() => {
                    setMems((prevMems) =>
                    prevMems.map((m, i) =>
                        i === index ? { ...m, expanded: !m.expanded } : m
                    )
                    );
                }}>
                    <img class="mem-image" src={mem.image} alt={mem.name} />
                    <div class="mem-name">{mem.name}</div>
                    <small class="mem-born">
                    {new Date(mem.born).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(mem.died).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    </small>
                    {mem.expanded ? (
                    <>
                        <div class="mem-desc">{mem.response}</div>
                        <div class="audio-button-cont">
                            <audio controls>
                                <source src={mem.audio} type="audio/mpeg"></source>
                            </audio>
                        </div>
                    </>
                    ) : (
                    <></>
                    )}
                </div>
                ))}
        </div>

        <div class = "flex-end">
            <p id = "copyright">&#169; Harris Hasnain 2023</p>
        </div>

        </>
    )


}

export default Obituary;