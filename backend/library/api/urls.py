from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),  # This line includes the Django admin URLs
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',views.signUp,name="signup"),
    path('registerVerify/',views.register_verify,name="register_verify"),
    path('getuser/<int:id>',views.get_user,name='get_user'),
    path('books/',views.books_available,name="books_available"),
    path('filter/',views.Filter,name='Filter'),
    path('pdfDownload/<int:id>',views.pdf_Download,name='pdf_Download'),
]