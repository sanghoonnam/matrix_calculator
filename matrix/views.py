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
def inverseCh(request):
    return render(request, "matrix/inverseCh.html")
def inverseSp(request):
    return render(request, "matrix/inverseSp.html")
def inverseVi(request):
    return render(request, "matrix/inverseVi.html") 
def inversePo(request):
    return render(request, "matrix/inversePo.html")
def inverseIn(request):
    return render(request, "matrix/inverseIn.html")
def inverseRu(request):
    return render(request, "matrix/inverseRu.html")

def indexEn(request):
    return render(request, "matrix/index.html")
def indexKo(request):
    return render(request, "matrix/indexKo.html")
def indexJa(request):
    return render(request, "matrix/indexJa.html")    
def indexCh(request):
    return render(request, "matrix/indexCh.html") 
def indexSp(request):
    return render(request, "matrix/indexSp.html") 
def indexVi(request):
    return render(request, "matrix/indexVi.html") 
def indexPo(request):
    return render(request, "matrix/indexPo.html") 
def indexIn(request):
    return render(request, "matrix/indexIn.html") 
def indexRu(request):
    return render(request, "matrix/indexRu.html") 


def deterEn(request):
    return render(request, "matrix/deterEn.html")
def deterKo(request):
    return render(request, "matrix/deterKo.html")
def deterJa(request):
    return render(request, "matrix/deterJa.html")    
def deterCh(request):
    return render(request, "matrix/deterCh.html") 
def deterSp(request):
    return render(request, "matrix/deterSp.html") 
def deterVi(request):
    return render(request, "matrix/deterVi.html") 
def deterPo(request):
    return render(request, "matrix/deterPo.html") 
def deterIn(request):
    return render(request, "matrix/deterIn.html") 
def deterRu(request):
    return render(request, "matrix/deterRu.html")