from common.api.permissions import IsAdminOrReadOnly


class GoodPermission(IsAdminOrReadOnly):
    def has_permission(self, request, view):
        return super().has_permission(request, view) or (
                request.user and
                request.user.is_authenticated and
                request.user.store is not None)

    def has_object_permission(self, request, view, obj):
        return super().has_permission(request, view) or (
                request.user and
                request.user.is_authenticated and
                request.user.store == obj.seller)
