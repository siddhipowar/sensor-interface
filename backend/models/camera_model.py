from pydantic import BaseModel

class camera(BaseModel):
    cam_serial : str
    cam_info : str
