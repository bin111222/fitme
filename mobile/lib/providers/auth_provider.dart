import 'package:flutter/foundation.dart';
import 'package:shared_preferences.dart';
import 'package:empowerfit/services/api_service.dart';
import 'package:empowerfit/models/user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _loading = false;

  User? get user => _user;
  String? get token => _token;
  bool get loading => _loading;
  bool get isAuthenticated => _token != null;

  Future<void> login(String email, String password) async {
    _loading = true;
    notifyListeners();

    try {
      final response = await ApiService.login(email, password);
      _token = response['token'];
      _user = User.fromJson(response['user']);
      await _saveAuthData();
    } catch (e) {
      rethrow;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    _user = null;
    _token = null;
    await SharedPreferences.getInstance()
      ..remove('token')
      ..remove('user');
    notifyListeners();
  }

  Future<void> _saveAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', _token!);
    await prefs.setString('user', userToJson(_user!));
  }

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    final userJson = prefs.getString('user');
    if (userJson != null) {
      _user = userFromJson(userJson);
    }
    notifyListeners();
  }
} 