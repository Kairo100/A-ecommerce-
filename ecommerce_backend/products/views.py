
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category , Advertisement , Products
from .serializers import CategorySerializer , AdvertisementSerializer , ProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.filters import SearchFilter
# categories
class CategoryListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        category.delete()
        return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# banner



class AdvertisementListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        advertisements = Advertisement.objects.all()
        serializer = AdvertisementSerializer(advertisements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# products


class ProductListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Products.objects.filter(available=True)
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description']  # Fields to search in
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        category_id = self.request.query_params.get('category')
        if category_id:
            return Products.objects.filter(category_id=category_id, available=True)
        return Products.objects.filter(available=True)

class ProductDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Products.objects.filter(available=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
