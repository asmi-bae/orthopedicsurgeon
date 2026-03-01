package com.orthopedic.api.shared.util;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@UtilityClass
public class PageableUtils {

    public static Pageable createPageable(int page, int size, String sort, String direction, List<String> allowedSortFields) {
        Sort.Direction dir = Sort.Direction.fromString(direction != null ? direction : "DESC");
        String sortBy = (sort != null && allowedSortFields.contains(sort)) ? sort : "createdAt";
        
        return PageRequest.of(page, Math.min(size, 100), Sort.by(dir, sortBy));
    }
}
