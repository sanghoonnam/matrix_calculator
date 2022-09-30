from http.client import HTTPResponse
from django.shortcuts import render

def sitemap(request):
    return render(request, 'sitemap.xml', content_type="text/xml")

def index(request):
    return render(request, 'matrix/index.html')

def inverseEn(request):
    return render(request, "matrix/inverseEn.html")   

def inverseKo(request):
    return render(request, "matrix/inverseKo.html")

def inverseJa(request):
    return render(request, "matrix/inverseJa.html")

def indexEn(request):
    return render(request, "matrix/indexEn.html")

def indexKo(request):
    return render(request, "matrix/indexKo.html")

def indexJa(request):
    return render(request, "matrix/indexJa.html")    