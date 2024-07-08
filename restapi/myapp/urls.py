from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LogoutView, register_view, PostViewSet, CustomAuthToken, PostCreateView

router = DefaultRouter()
router.register(r'posts', PostViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/posts/', PostCreateView.as_view(), name='post-create'),
    path('api/login/', CustomAuthToken.as_view(), name='login'),
    path('api/register/', register_view, name='register'),
    path('api/logout/', LogoutView.as_view(), name='logout')
]

