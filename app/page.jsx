"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validURL(url) == false) {
      alert("enter a valid url")
    } 
    else {
      setSummary('')
      const response = await fetch("http://localhost:5000/process", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: url}),
      });

      const text = await response.json()
      if(response.status == 200){
        setIsSubmitted(true)
        setSummary(text)
        return response
      }
      else{
        alert(text)
      }

    }
  }
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <main className="flex flex-col bg-brat">
      <div className="content-center p-5 pt-32 pb-9 bg-brat font-arial text-9xl tracking-tighter font-light scale-x-75 text-black">
        <h1> summarize any text</h1>
      </div>
      {!isSubmitted ? (
        <div className="flex justify-items-center justify-center py-20">
          <form className="flex items-center">
            <input 
              className="w-max text-4xl p-4 outline-none bg-white font-arial scale-x-75 text-black"
              placeholder="enter any url i guess"
              onChange={(e) => setUrl(e.target.value)} value = {url}></input>
            <button 
              onClick={handleSubmit}

              className="bg-white text-black text-4xl px-6 py-4 hover:bg-gray-200 transition-colors scale-x-75"
              type="submit"
            >
              summarize
            </button>
          </form>
        </div>
      ) : (<div className="flex justify-items-center justify-center py-20"> {summary ? 
          (<div className="flex flex-col font-arial text-4xl tracking-tighter font-light scale-x-75 text-black"> 
            <a className="pb-20 text-justify"> {summary} </a>
            <button onClick={() => {setIsSubmitted(false)}}
              className="w-96 bg-white text-black text-4xl px-6 py-4 hover:bg-gray-200 transition-colors"
            > summarize another url</button>
          </div>) : 
          (<div className="processing flex flex-box justify-self-start font-arial text-7xl tracking-tighter font-light scale-x-75 text-black">
          </div>) } 
        </div>)}
    </main >
  );
}
