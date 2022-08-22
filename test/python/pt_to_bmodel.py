import bmnetp
# # compile fp32 model

bmnetp.compile(
    model="./yolov5s_complex7.torchscript",  # Necessary
    outdir="./bm_model",  # Necessary
    target="BM1684",  # Necessary
    shapes=[[1, 3, 640, 640]],  # optional, if not set, default use shape in prototxt
    net_name="yolov5s_complex_class7",  # optional, if not set, default use the network name in prototxt
    opt=2,  # optional, if not set, default equal to 2
    dyn=False,  # optional, if not set, default equal to False
    cmp=True,  # optional, if not set, default equal to True
    enable_profile=True  # optional, if not set, default equal to False
)
