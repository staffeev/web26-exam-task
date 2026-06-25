from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
import gzip

app = FastAPI()


@app.get("/login")
def login():
    return "staffeev409626"


@app.post("/zipper")
async def zipper(file: UploadFile = File(...)):
    data = await file.read()
    compress = gzip.compress(data)
    return Response(content=compress, media_type="application/gzip")