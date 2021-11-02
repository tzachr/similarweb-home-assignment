import {useState, useEffect, useRef} from "react";
import useVideos from "../../hooks/useVideos";

export default function VideoInput({className}) {   
    const [isValid, setIsValid] = useState(false);
    const [showError, setShowError] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const {addVideo} = useVideos();

    const handleSubmit = e => {
        e.preventDefault();
        addVideo(e.target[0].value)
        inputRef.current.value = "";
    }

    const handleChange = e => {
        const pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
        const isInputValid = pattern.test(e.target.value);
        setIsValid(isInputValid);
        setShowError(!isInputValid)
    }

    return (
        <form className={`${className} bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg`} onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
                <input className="w-2/3 text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-2 px-3" type="text" placeholder="Enter video url" ref={inputRef} onChange={handleChange} />
                <button className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 disabled:opacity-50" disabled={!isValid}>
                    Add
                </button>
            </div>
            {(!isValid && showError) && <div className="text-red-300 text-xs pt-1">Please enter a valid youtube video url</div>}
        </form>
    )
}
