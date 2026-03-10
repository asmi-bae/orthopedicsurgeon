package com.orthopedic.api.modules.website.service;

import com.orthopedic.api.modules.website.dto.request.UpdateSiteSettingRequest;
import com.orthopedic.api.modules.website.dto.response.SiteSettingResponse;
import java.util.List;
import java.util.UUID;

public interface SiteSettingService {
    List<SiteSettingResponse> getAllSettings();
    List<SiteSettingResponse> getSettingsByLang(String lang);

    List<SiteSettingResponse> getPublicSettings();

    List<SiteSettingResponse> getPublicSettingsByLang(String lang);

    SiteSettingResponse getSettingByKeyAndLang(String key, String lang);

    java.util.Map<String, String> getTranslations(String lang);

    SiteSettingResponse updateSetting(UUID id, UpdateSiteSettingRequest request);

    SiteSettingResponse updateSettingByKeyAndLang(String key, String lang, UpdateSiteSettingRequest request);
}
