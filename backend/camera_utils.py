import chronoptics.tof as tof
from models.camera_model import camera
from models.camera_settings_model import camera_settings

class CameraManager:
    def __init__(self, serial):
        self.cam = tof.kea_camera(serial)

streamingCameraList = []

#discover list of cameras available to connect
async def get_cameras():
    # shows a list of available cameras to connect to
    print("entered")
    cameras = tof.discoverKeaCameras()
    camera_list = []
    print(cameras)
    for cam in cameras:
        cam_serial = cam.serial()
        cam_info = cam.info()
        camera_list.append(camera(cam_serial=cam_serial, cam_info=cam_info))
    print(camera_list)
    if camera_list:
        return camera_list
    else:
        return []
    
# connects to the selected camera and starts streaming    
async def start_streaming(serial:str):
    cam = tof.KeaCamera(serial=serial)
    types = [tof.FrameType.INTENSITY, tof.FrameType.XYZ]
    tof.selectStreams(cam, types)
    streamingCameraList.append(CameraManager(serial))
    cam.start()
    print(cam.isStreaming(), "hello")

# connects to the selected camera and stops streaming
async def stop_streaming(serial:str):
    # if serial in streamingCameraList:
    if len(streamingCameraList):
        for i in streamingCameraList:
            if i.cam.getSerial() == serial:
                print(i.cam.isStreaming())
                print(i.cam.getStreamList())
                print(i.cam.getSerial())
    #print(cam.isStreaming())
    # if cam.isConnected():
    #     cam.stop()

# Gets frames of frame type intensity
async def get_intensity_frames(serial:str) -> list:
    frames = []
    types = [tof.FrameType.INTENSITY]
    cam = tof.KeaCamera(serial=serial)
    tof.selectStreams(cam, types)
    while cam.isStreaming():
        frames = cam.getFrames
    return frames

# Gets frames of frame type XYZ         
async def get_xyz_frames(serial:str) -> list:
    frames = []
    types = [tof.FrameType.XYZ]
    cam = tof.KeaCamera(serial=serial)
    tof.selectStreams(cam, types)
    while cam.isStreaming():
        frames = cam.getFrames
    return frames



