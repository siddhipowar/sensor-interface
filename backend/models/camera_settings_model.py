from pydantic import BaseModel

class camera_settings(BaseModel):
    cam_environment : str
    cam_fps : float
    cam_config_type : str
    cam_integration_time : str
    cam_serial_number : str
    enable_binning : bool
    enable_temporal : bool
    #enable_mixed_pixel : bool
    enable_amplitude_threshold : bool