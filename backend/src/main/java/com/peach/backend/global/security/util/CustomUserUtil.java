package com.peach.backend.global.security.util;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.domain.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import static com.peach.backend.global.config.CacheConfig.USER_CACHE;

@RequiredArgsConstructor
@Component
public class CustomUserUtil {

    private final UserRepository userRepository;

    @Cacheable(cacheNames = USER_CACHE, key = "'user:' + #p0")
    public User getUser(final String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> UserNotFoundException.EXCEPTION);
    }

}