from models.camera_settings_model import camera_settings
import chronoptics.tof as tof

#set up camera configurations
async def set_camera_configuration(serial: str, settings: camera_settings):
    # Create new user config
    user_config = tof.UserConfig()

    # Choose indoors/outdoors
    environment_enum = getattr(tof.ImagingEnvironment, settings.cam_environment.upper())
    user_config.setEnvironment(environment_enum)

    # Choose FPS limit
    user_config.setFps(settings.cam_fps)

    # Choose config type
    strategy_enum = getattr(tof.Strategy, settings.cam_config_type.upper())
    user_config.setStrategy(strategy_enum)

    # Choose integration time
    integration_time_enum = getattr(tof.IntegrationTime, settings.cam_integration_time.upper())
    user_config.setIntegrationTime(integration_time_enum)

    # Connect to camera
    cam = tof.KeaCamera(None, settings.cam_serial_number)

    # Create camera config for camera
    camera_config = user_config.toCameraConfig(cam)

    # Set camera config on camera
    cam.setCameraConfig(camera_config)

    proc_config = tof.ProcessingConfig()

    proc_config.setBinningEnabled(settings.enable_binning)

    proc_config.setTemporalEnabled(settings.enable_temporal)

    #proc_config.setMixedPixelEnabled(settings.enable_mixed_pixel)

    proc_config.setAmpThresholdEnabled(settings.enable_amplitude_threshold)

    #set high dynamic range

    cam.setConfigurations(camera_config, proc_config)

    
