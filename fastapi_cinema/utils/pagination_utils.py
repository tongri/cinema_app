class PaginationParams:
    def __init__(self, size: int = 10, page: int = 1, all_objects: bool = False):
        self.size = size
        self.page = page
        self.all_objects = all_objects


def from_response_to_page(page: PaginationParams, items) -> dict:
    return {
        "total": len(items),
        "size": len(items) if page.all_objects else page.size,
        "items": items if page.all_objects else items[(page.page - 1) * page.size : page.page * page.size],
        "page": page.page,
    }
