import chronoptics.tof as tof
from models.camera_model import camera
from models.camera_settings_model import camera_settings

class CameraManager:
    def __init__(self):
        self.cam = None

    # streamingCameraList = []

    def connectCamera(self, serial):
        self.cam = tof.KeaCamera(serial=serial)

    def DisconnectCamera(self):
        self.cam = None

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
    async def start_streaming(self, pc: bool, intensity: bool):
        # cm = CameraManager(serial)
        # cam = tof.KeaCamera(serial=serial)
        if pc:
            types = [tof.FrameType.XYZ]
        elif intensity:
            types = types = [tof.FrameType.INTENSITY]
        else:
            types = types = [tof.FrameType.INTENSITY, tof.FrameType.XYZ]
        
        
        if self.cam:
            tof.selectStreams(self.cam, types)
            # streamingCameraList.append(CameraManager(serial))
            self.cam.start()
            print(self.cam.isStreaming(), f"Hi it's {self.cam.getSerial()}")

    # stops streaming from the camera
    async def stop_streaming(self):
        self.cam.stop()
    

    # Set the camera configurations
    async def camera_configuration(self, settings: camera_settings):
        user_config = tof.UserConfig()


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

    # Gets frame of frame type XYZ         
    async def get_xyz_frames(self, serial: str) -> list: 
        if self.cam and self.cam.getSerial() == serial:
            # getFrames() returns one frame so the variable XYZframe will have one frame stored in this function
            XYZframe = self.cam.getFrames()
            return XYZframe



