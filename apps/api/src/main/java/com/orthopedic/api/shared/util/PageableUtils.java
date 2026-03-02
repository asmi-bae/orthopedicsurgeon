package com.orthopedic.api.shared.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public class PageableUtils {

    private PageableUtils() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

    public static Pageable createPageable(int page, int size, String sort, String direction, List<String> allowedSortFields) {
        Sort.Direction dir = Sort.Direction.fromString(direction != null ? direction : "DESC");
        String sortBy = (sort != null && allowedSortFields.contains(sort)) ? sort : "createdAt";
        
        return PageRequest.of(page, Math.min(size, 100), Sort.by(dir, sortBy));
    }
}
