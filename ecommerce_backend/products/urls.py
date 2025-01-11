# urls.py
from django.urls import path
from .views import CategoryListView, CategoryDetailView , ProductDetailView, ProductListView, AdvertisementListView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),  
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('advertisements/', AdvertisementListView.as_view(), name='advertisement-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),

     
]
