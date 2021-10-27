import './index.scss'
import { useState } from 'react'

let algorithm = ['SVM', 'logistic']


function App() {

  const [algorithmChecked1, setAlgorithmChecked1] = useState('')
  const [algorithmChecked2, setAlgorithmChecked2] = useState('')
  const [accuracy, setAccuracy] = useState('')
  const [predY, setPredY] = useState([])
  const [testY, setTestY] = useState([])
  const [objPred, setObjPred] = useState({})
  const [predResult, setPredResult] = useState('')

  const handleGetTestResult = () => {
    fetch(`http://localhost:5000/testSetPredictResults/${algorithmChecked2}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setAccuracy(res.accuracy)
        setPredY(res.predY)
        setTestY(res.testY)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeInput = (key, e) => {
    setObjPred({
      ...objPred,
      [key]: e.target.value
    })
  }

  const handlePredict = async () => {
    let url = new URL("http://localhost:5000/predict"),
      params = {
        "type": algorithmChecked1,
        "id": 2000,
        "Area": objPred['Area'],
        "MajorAxisLength": objPred['MajorAxisLength'],
        "MinorAxisLength": objPred['MinorAxisLength'],
        "Eccentricity": objPred['Eccentricity'],
        "ConvexArea": objPred['ConvexArea'],
        "EquivDiameter": objPred['EquivDiameter'],
        "Extent": objPred['Extent'],
        "Perimeter": objPred['Perimeter'],
        "Roundness": objPred['Roundness'],
        "AspectRation": objPred['AspectRation']
      }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        setPredResult(res['predict'])
      })
    setObjPred([])
  }

  return (
    <div className="App">
      <div className="content">
        <div className="predict">
          <div className="form">
            <h2 className="form__heading">
              Predict
            </h2>
            <div className="form__input">
              <input type="text" value={objPred["Area"] || ''} placeholder="Area" onChange={(e) => handleChangeInput('Area', e)} />
              <input type="text" value={objPred["MajorAxisLength"] || ''} placeholder="MajorAxisLength" onChange={(e) => handleChangeInput('MajorAxisLength', e)} />
              <input type="text" value={objPred["MinorAxisLength"] || ''} placeholder="MinorAxisLength" onChange={(e) => handleChangeInput('MinorAxisLength', e)} />
              <input type="text" value={objPred["Eccentricity"] || ''} placeholder="Eccentricity" onChange={(e) => handleChangeInput('Eccentricity', e)} />
              <input type="text" value={objPred["ConvexArea"] || ''} placeholder="ConvexArea" onChange={(e) => handleChangeInput('ConvexArea', e)} />
              <input type="text" value={objPred["EquivDiameter"] || ''} placeholder="EquivDiameter" onChange={(e) => handleChangeInput('EquivDiameter', e)} />
              <input type="text" value={objPred["Extent"] || ''} placeholder="Extent" onChange={(e) => handleChangeInput('Extent', e)} />
              <input type="text" value={objPred["Perimeter"] || ''} placeholder="Perimeter" onChange={(e) => handleChangeInput('Perimeter', e)} />
              <input type="text" value={objPred["Roundness"] || ''} placeholder="Roundness" onChange={(e) => handleChangeInput('Roundness', e)} />
              <input type="text" value={objPred["AspectRation"] || ''} placeholder="AspectRation" onChange={(e) => handleChangeInput('AspectRation', e)} />
              <div className="radio-button-group">
                {
                  algorithm.map((item, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        checked={algorithmChecked1 === item}
                        onChange={() => setAlgorithmChecked1(item)}
                      />
                      <span>{item}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div
              className="form__submit"
              onClick={handlePredict}
            >
              Predict
            </div>
          </div>
          <div className="predict__result">
            Result: {predResult}
          </div>
        </div>
        <div className="testSetPredictResults">
          <div className="form">
            <h2 className="form__heading">
              Prediction result of test set
            </h2>
            <div className="form__input">
              <div className="radio-button-group">
                {
                  algorithm.map((item, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        checked={algorithmChecked2 === item}
                        onChange={() => setAlgorithmChecked2(item)}
                      />
                      <span>{item}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div
              className="form__submit"
              onClick={handleGetTestResult}
            >
              Get
            </div>
          </div>
          <div className="testSetPredictResults__result">
            <div className="testSetPredictResults__result-list">
              <div>
                {predY.map((item, index) => {
                  return <p key={index}>{`Predict value: ${item}`}</p>
                })}
              </div>
              <div>
                {testY.map((item, index) => {
                  return <p key={index}>{`Real result value: ${item}`}</p>
                })}
              </div>
            </div>
            <div className="testSetPredictResults__result-accuracy">
              Accuracy: {accuracy * 100}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
