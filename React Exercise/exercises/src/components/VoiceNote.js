import React, { useState, useRef } from 'react';

const VoiceNoteApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const startTimeRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    setAudioURL(null);
    startTimeRef.current = Date.now();
    setRecordedNotes([]);
    setRecordingTime(0);
    const timerId = setInterval(() => {
      setRecordingTime(prevTime => prevTime + 1);
    }, 1000);
    startTimeRef.current = Date.now() - recordingTime * 1000;
    setRecordedNotes(prevNotes => [...prevNotes, { recordingTime: recordingTime, timerId }]);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
      })
      .catch(console.error);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(recordedNotes[recordedNotes.length - 1].timerId);
    mediaRecorderRef.current.stop();
  };

  const handleDataAvailable = ({ data }) => {
    const newNote = {
      chunks: [data],
    };
    setRecordedNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      updatedNotes[updatedNotes.length - 1].chunks = newNote.chunks;
      return updatedNotes;
    });
  };

  const handlePlayback = (chunks) => {
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  const handleDeleteRecording = () => {
    setRecordedNotes([]);
    setAudioURL(null);
  };

  return (
    <div>
      <h1>Voice Note App</h1>
      {!isRecording ? (
        <>
          <button onClick={startRecording}>Start Recording</button>
          {audioURL && <audio controls src={audioURL}></audio>}
        </>
      ) : (
        <>
          <button onClick={stopRecording}>Stop Recording</button>
          <button>Recording Time: {recordingTime} seconds</button>
        </>
      )}
      {recordedNotes.length > 0 && (
        <>
          <button onClick={() => handlePlayback(recordedNotes[recordedNotes.length - 1].chunks)}>Play Last Recorded Note</button>
          <button onClick={handleDeleteRecording}>Delete Recorded Notes</button>
        </>
      )}
      {recordedNotes.length > 0 && (
        <div>
          <h2>All Recorded Voice Notes</h2>
          <ul>
            {recordedNotes.map((note, index) => (
              <li key={index}>
                <button onClick={() => handlePlayback(note.chunks)}>{`Recording Time: ${recordingTime} seconds`}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VoiceNoteApp;
