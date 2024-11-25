class User {
  final String id;
  final String email;
  final String role;
  final Profile profile;

  User({
    required this.id,
    required this.email,
    required this.role,
    required this.profile,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      email: json['email'],
      role: json['role'],
      profile: Profile.fromJson(json['profile']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'email': email,
      'role': role,
      'profile': profile.toJson(),
    };
  }
}

class Profile {
  final String firstName;
  final String lastName;
  final String? phone;
  final String? avatar;

  Profile({
    required this.firstName,
    required this.lastName,
    this.phone,
    this.avatar,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      firstName: json['firstName'],
      lastName: json['lastName'],
      phone: json['phone'],
      avatar: json['avatar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'avatar': avatar,
    };
  }
} 