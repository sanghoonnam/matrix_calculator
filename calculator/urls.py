"""calculator URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import matrix.views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import sitemaps
from django.contrib.sitemaps.views import sitemap

urlpatterns = [
    path("admin/", admin.site.urls),
    path("",matrix.views.index,name="index"),
    path("ko/prime",matrix.views.primeKo, name="primeKo"),
    path("en/inverse",matrix.views.inverseEn, name="inverseEn"),
    path("ko/inverse",matrix.views.inverseKo,name="inverseKo"),
    path("ja/inverse",matrix.views.inverseJa, name="inverseJa"),
    path("ch/inverse",matrix.views.inverseCh, name="inverseCh"),
    path("sp/inverse",matrix.views.inverseSp, name="inverseSp"),
    path("vi/inverse",matrix.views.inverseVi, name="inverseVi"),
    path("po/inverse",matrix.views.inversePo, name="inversePo"),
    path("in/inverse",matrix.views.inverseIn, name="inverseIn"),
    path("ru/inverse",matrix.views.inverseRu, name="inverseRu"),
    path("en/deter",matrix.views.deterEn, name="deterEn"),
    path("ko/deter",matrix.views.deterKo,name="deterKo"),
    path("ja/deter",matrix.views.deterJa, name="deterJa"),
    path("ch/deter",matrix.views.deterCh, name="deterCh"),
    path("sp/deter",matrix.views.deterSp, name="deterSp"),
    path("vi/deter",matrix.views.deterVi, name="deterVi"),
    path("po/deter",matrix.views.deterPo, name="deterPo"),
    path("in/deter",matrix.views.deterIn, name="deterIn"),
    path("ru/deter",matrix.views.deterRu, name="deterRu"),
    path("en",matrix.views.indexEn, name="indexEn"),
    path("ko",matrix.views.indexKo,name="indexKo"),
    path("ja",matrix.views.indexJa, name="indexJa"),
    path("ch",matrix.views.indexCh, name="indexCh"),
    path("sp",matrix.views.indexSp, name="indexSp"),
    path("vi",matrix.views.indexVi, name="indexVi"),
    path("po",matrix.views.indexPo, name="indexPo"),
    path("in",matrix.views.indexIn, name="indexIn"),
    path("ru",matrix.views.indexRu, name="indexRu"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
