import chronoptics.tof as tof
from models.camera_model import camera
from models.camera_settings_model import camera_settings

class CameraManager:
    def __init__(self):
        self.cam = None

    # streamingCameraList = []

    def connectCamera(self, serial):
        self.cam = tof.KeaCamera(serial=serial)

    #discover list of cameras available to connect
    async def get_cameras(self):
        # shows a list of available cameras to connect to
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
    async def start_streaming(self):
        # cm = CameraManager(serial)
        # cam = tof.KeaCamera(serial=serial)
        types = [tof.FrameType.INTENSITY, tof.FrameType.XYZ]
        if self.cam:
            tof.selectStreams(self.cam, types)
            # streamingCameraList.append(CameraManager(serial))
            self.cam.start()
            print(self.cam.isStreaming(), "The camera is streaming")

# # connects to the selected camera and stops streaming
# async def stop_streaming(serial:str):
#     # if serial in streamingCameraList:
#     if len(streamingCameraList):
#         for i in streamingCameraList:
#             if i.cam.getSerial() == serial:
#                 print(i.cam.isStreaming())
#                 print(i.cam.getStreamList())
#                 print(i.cam.getSerial())
#     #print(cam.isStreaming())
#     # if cam.isConnected():
#     #     cam.stop()

    # Gets frames of frame type intensity
    async def get_intensity_frames(self, serial:str) -> list:
        frames = []
        types = [tof.FrameType.INTENSITY]
        # cam = tof.KeaCamera(serial=serial)
        if self.cam and self.cam.getSerial() == serial:
            tof.selectStreams(self.cam, types)
            while self.cam.isStreaming():
                frames = self.cam.getFrames()
            return frames

    # Gets frames of frame type XYZ         
    async def get_xyz_frames(self, serial: str) -> list: 
        types = [tof.FrameType.XYZ]
        if self.cam and self.cam.getSerial() == serial:
            tof.selectStreams(self.cam, types)
            XYZframe = self.cam.getFrames()
            print(XYZframe)
            return XYZframe



