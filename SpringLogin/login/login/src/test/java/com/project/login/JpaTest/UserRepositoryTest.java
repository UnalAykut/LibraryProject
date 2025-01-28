package com.project.login.JpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.project.login.model.User;
import com.project.login.repository.UserRepository;
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldSaveUserSuccessfully() {
        // Kullanıcı oluştur
        User user = new User();
        user.setUsername("test");
        user.setPassword("test123");
        
        // Kullanıcıyı kaydet
        User savedUser = userRepository.save(user);
        
        // Doğrulamalar
        assertNotNull(savedUser.getId(), "Kullanıcının ID'si null olmamalı");
        assertEquals("test", savedUser.getUsername(), "Kullanıcı adı yanlış");
        assertEquals("test123", savedUser.getPassword(), "Kullanıcı şifresi yanlış");
        
        System.out.println("Kaydedilen id: " + savedUser.getId() +
                           "\nKaydedilen Kullanıcı Adı: " + savedUser.getUsername() +
                           "\nKaydedilen Kullanıcı Şifresi: " + savedUser.getPassword());
    }

    
    @Test
    public void shouldNotAllowDuplicateUsernames() {
        // İlk kullanıcıyı oluştur ve kaydet
        User user1 = new User();
        user1.setUsername("testuser");
        user1.setPassword("password123");
        userRepository.save(user1);

        // Aynı kullanıcı adıyla ikinci kullanıcıyı oluştur
        User user2 = new User();
        user2.setUsername("testuser"); // Aynı kullanıcı adı
        user2.setPassword("password456");

        // Beklenen durum: username benzersiz olduğu için bir hata fırlatılmalı
        Exception exception = assertThrows(Exception.class, () -> {
            userRepository.save(user2);
        });

        // Hata mesajını kontrol edebilirsiniz (isteğe bağlı)
        String expectedMessage = "could not execute statement"; // Hibernate'den gelen hata mesajı
        String actualMessage = exception.getMessage();
        System.out.println("Hata Mesajı: " + actualMessage);

        assertNotNull(actualMessage, "Hata mesajı boş olmamalı");
        assertEquals(expectedMessage, actualMessage.substring(0, expectedMessage.length()), "Beklenen hata mesajı ile uyuşmuyor");
    }
}
