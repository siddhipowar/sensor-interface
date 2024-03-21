# sensor-interface
 A web application for Gordon. Application to stream Point Cloud, Intensity and depth frames with various other uses cases to add on to in the future.

Technologies used:
FastAPI Framework, React.js, Three.js, Websockets

Backend: 
Used FastAPI framework to define APIs.
Defined APIs for:
 - Discovering cameras to connect to
 - Connecting and disconnecting camera
 - Setting camera configurations
 - Intensity stream, point cloud stream, depth stream
 - Disconnecting the camera
Frontend:
Developed frontend using React.js.
Handled frontend for discovering cameras, selecting camera to connect to and also displaying stream after the connection.
Made use of three.js library for streaming point cloud information.

Future work: 
Setting controls for point cloud zoom in, zoom out, pan, etc.
Other applications like object detection and HDR can be integrated as its programs are already developed.


 *Run backend*:
 cd backend
 venv\Scripts\activate
 python main.py

 *Run frontend*:
 cd frontend
 npm start
