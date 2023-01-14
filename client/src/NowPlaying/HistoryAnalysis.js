import axios from "axios";
import { useEffect, useState } from "react";

function HistoryAnalysis () {
  const baseUrl = 'http://localhost:4000/';
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    try {
    axios.get(baseUrl + 'analyse-history')
      .then(res => {
        console.log('analysis!!!!!', res);
      })
    } catch (err) {
      console.log(err);
    }
  })

  return (
    <div>
      {analysis ? 
      <div>Your top track is {analysis}</div> : null
    }
    </div>
  )
}

export default HistoryAnalysis;