from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem, Products

class CartView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Get or create the cart for the authenticated user
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = cart.items.select_related('product')  # Use select_related to avoid N+1 queries

        # Return the cart items with product images and total price
        return Response({
            "items": [
                {
                    "id": item.id,
                    "product": item.product.id,
                    "name": item.product.name,
                    "quantity": item.quantity,
                    "price": item.product.price,
                    "images": [{"image": image.image.url} for image in item.product.images.all()]  # Adding images here
                } for item in items
            ],
            "total": sum(item.quantity * item.product.price for item in items)
        })

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Products.objects.get(id=product_id)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        # Get or create the cart for the authenticated user
        cart, _ = Cart.objects.get_or_create(user=request.user)

        # Check if the product is already in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity  # Update quantity if the item is already in the cart
        cart_item.save()

        return Response({"message": "Item added to cart", "item": cart_item.id})

    def delete(self, request):
        item_id = request.data.get('item_id')

        # Delete the item from the cart
        try:
            cart_item = CartItem.objects.get(id=item_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart"})
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)
