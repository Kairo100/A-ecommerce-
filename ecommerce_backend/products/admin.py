from django.contrib import admin
from .models import Category,Advertisement, Products, ProductsImage 


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

# advertisement
@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)


#products
@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('name','price','stock','available', 'created_at')
    list_filter =('available','created_at' )
    search_fields = ('name', 'description')
    prepopulated_fields ={ 'slug':('name',)}

#products Image
@admin.register(ProductsImage)
class ProductsImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image')

