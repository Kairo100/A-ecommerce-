from rest_framework import serializers
from .models import Category ,Advertisement , ProductsImage , Products

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image']


#advertisement
class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = ['id', 'image', 'title']


# products Image
class ProductsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsImage
        fields = ['id', 'image', 'alt_text']



# products
class ProductSerializer(serializers.ModelSerializer):
    images = ProductsImageSerializer(many=True, read_only=True)
   

    class Meta:
        model = Products
        fields = [
            'id', 'category', 'name', 'slug', 'description',
            'price', 'stock', 'available', 'created_at',
            'updated_at', 'images'
        ]