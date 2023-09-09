import { useState } from 'react';
import './index.css';
import { useNavigate  } from 'react-router-dom';

function NewObituary() {
    
    const navigate = useNavigate()

    const exitCreate = () => {

        navigate("/")

    }

    const [deceasedName, setDeceasedName] = useState("")
    const [born, setBorn] = useState(null)
    const [died, setDied] = useState(null)
    const [file, setFile] = useState(null)

    const [isLoading, setIsLoading] = useState(false);

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        if (!file) {
            alert("Must select a file.")
        }
        else {
            const bornMs = Date.parse(born)
            const diedMs = Date.parse(died)

             const bornDate = new Date(bornMs).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            const diedDate = new Date(diedMs).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            const data = new FormData();
            data.append("file", file)
            data.append("name", deceasedName)
            data.append("born", bornDate)
            data.append("died", diedDate)

            console.log("data contents start...")
            console.log("file:")
            console.log(file)
            console.log("name:")
            console.log(deceasedName)
            console.log("born:")
            console.log(bornDate)
            console.log("died:")
            console.log(diedDate)
            console.log("data contents end...")
            //console.log("start of data:")
            //const entries = data.entries();
            //for (let pair of entries) {
                //console.log(pair[0] + ': ' + pair[1]);
            //}
            //console.log("end of data:")

            setIsLoading(true);

            const res = await fetch(
                "https://oxlggvur3fubmetlfe7iqus74y0ajwpg.lambda-url.ca-central-1.on.aws/",
                {
                    method: "POST",
                    body: data,
                }
            );

            const jsonRes = await res.json()
            console.log(jsonRes)
            console.log("saved to db")

            setIsLoading(false);

            navigate("/")
        }
    }
    
    return (
        <>
            <div class = "exit-cont">
                <div class = "exit-title"></div>
                <div class = "exit-title"></div>
                <div class = "exit-button-cont">
                    <button id = "exit-button" onClick={exitCreate}>&#10006;</button>
                </div>
            </div>



            <div class = "obituary-body-cont">

                <div id = "obituary-title"><b>Create a New Obituary</b></div>
                <div id = "flowers"><img src="https://media.istockphoto.com/id/978727178/vector/horizontal-vignette-with-a-rose-vector-illustration.jpg?s=612x612&w=0&k=20&c=6ndcF9rl5CD-PqjFmIk67wS17G1piJm680xZcV-1luc=" alt="Flowers"></img></div>
                <div id = "form-cont">
                    <form onSubmit = {(e) => onSubmitForm(e)}>
                        <label htmlFor="picture"><span  id = "image-selector">&#128424; Select an Image for the Deceased &#128424;</span>
                            <div id="selected-file">
                                {file ? file.name : "No file chosen"}
                            </div>
                        </label>
                        <input
                            type = "file"
                            id = "picture"
                            name = "picture"
                            accept = "images/*"
                            onChange = {(e) => onFileChange(e)}
                        />
                        <input
                            type = "text"
                            id = "deceased-name"
                            name = "deceased"
                            required
                            onChange = {(e) => setDeceasedName(e.target.value)}
                            placeholder="Name of the deceased..."

                        />
                        <label for="born" id = "born-label">Born:</label>
                        <input
                            type = "datetime-local"
                            id = "born"
                            name = "born"
                            required
                            onChange = {(e) => setBorn(e.target.value)}
                            placeholder="Name of the deceased..."

                        />
                        <label for="died" id = "died-label">Passed:</label>
                        <input
                            type = "datetime-local"
                            id = "died"
                            name = "died"
                            required
                            onChange = {(e) => setDied(e.target.value)}
                            placeholder="Name of the deceased..."
                        />
                        <button id = {isLoading ? "loading" : "submit"} type="submit" value="Submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Write Obituary'}</button>
                    </form>
                </div>
                






            </div>




            <div class = "flex-end">
                <p id = "copyright">&#169; Harris Hasnain 2023</p>
            </div>

        </>
    )


}

export default NewObituary;