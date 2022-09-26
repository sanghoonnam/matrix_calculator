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

urlpatterns = [
    path("admin/", admin.site.urls),
    path("",matrix.views.index,name="index"),
    path("en/inverse",matrix.views.inverseEn, name="inverseEn"),
    path("ko/inverse",matrix.views.inverseKo,name="inverseKo"),
    path("ja/inverse",matrix.views.inverseJa, name="inverseJa"),
    path("en",matrix.views.indexEn, name="inverseEn"),
    path("ko",matrix.views.indexKo,name="inverseKo"),
    path("ja",matrix.views.indexJa, name="inverseJa")
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
