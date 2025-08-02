export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          participant_1: string
          participant_2: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1: string
          participant_2: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          participant_1?: string
          participant_2?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message_text: string
          message_type: string | null
          sender_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_text: string
          message_type?: string | null
          sender_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_text?: string
          message_type?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_traits: {
        Row: {
          aesthetics_score: number | null
          cleanliness_score: number | null
          conflict_style_score: number | null
          created_at: string
          dietary_preferences: string[] | null
          early_bird_score: number | null
          extroversion_score: number | null
          fitness_interest_score: number | null
          id: string
          noise_tolerance_score: number | null
          pets_allowed: boolean | null
          privacy_preference_score: number | null
          routine_flexibility_score: number | null
          smoker: boolean | null
          social_activities: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          aesthetics_score?: number | null
          cleanliness_score?: number | null
          conflict_style_score?: number | null
          created_at?: string
          dietary_preferences?: string[] | null
          early_bird_score?: number | null
          extroversion_score?: number | null
          fitness_interest_score?: number | null
          id?: string
          noise_tolerance_score?: number | null
          pets_allowed?: boolean | null
          privacy_preference_score?: number | null
          routine_flexibility_score?: number | null
          smoker?: boolean | null
          social_activities?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          aesthetics_score?: number | null
          cleanliness_score?: number | null
          conflict_style_score?: number | null
          created_at?: string
          dietary_preferences?: string[] | null
          early_bird_score?: number | null
          extroversion_score?: number | null
          fitness_interest_score?: number | null
          id?: string
          noise_tolerance_score?: number | null
          pets_allowed?: boolean | null
          privacy_preference_score?: number | null
          routine_flexibility_score?: number | null
          smoker?: boolean | null
          social_activities?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aadhar_number: string | null
          age: number | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          location: string | null
          occupation: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          aadhar_number?: string | null
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          occupation?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          aadhar_number?: string | null
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          occupation?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          amenities: string[] | null
          city: string
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          latitude: number | null
          longitude: number | null
          name: string
          total_rooms: number | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          city: string
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name: string
          total_rooms?: number | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          total_rooms?: number | null
        }
        Relationships: []
      }
      room_assignments: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          monthly_rent: number | null
          room_id: string
          start_date: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          monthly_rent?: number | null
          room_id: string
          start_date: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          monthly_rent?: number | null
          room_id?: string
          start_date?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      roommate_matches: {
        Row: {
          compatibility_score: number
          created_at: string
          id: string
          match_explanation: string | null
          matched_user_id: string
          status: string | null
          suggested_room_id: string | null
          user_id: string
        }
        Insert: {
          compatibility_score: number
          created_at?: string
          id?: string
          match_explanation?: string | null
          matched_user_id: string
          status?: string | null
          suggested_room_id?: string | null
          user_id: string
        }
        Update: {
          compatibility_score?: number
          created_at?: string
          id?: string
          match_explanation?: string | null
          matched_user_id?: string
          status?: string | null
          suggested_room_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roommate_matches_suggested_room_id_fkey"
            columns: ["suggested_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: string[] | null
          created_at: string
          current_occupants: number | null
          floor_number: number | null
          has_attached_bathroom: boolean | null
          has_window: boolean | null
          id: string
          images: string[] | null
          is_available: boolean | null
          max_occupants: number | null
          monthly_rent: number | null
          property_id: string
          room_number: string
          room_type: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string
          current_occupants?: number | null
          floor_number?: number | null
          has_attached_bathroom?: boolean | null
          has_window?: boolean | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          max_occupants?: number | null
          monthly_rent?: number | null
          property_id: string
          room_number: string
          room_type: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string
          current_occupants?: number | null
          floor_number?: number | null
          has_attached_bathroom?: boolean | null
          has_window?: boolean | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          max_occupants?: number | null
          monthly_rent?: number | null
          property_id?: string
          room_number?: string
          room_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          attached_bathroom_preference: boolean | null
          created_at: string
          floor_preference: string | null
          id: string
          max_budget: number | null
          min_budget: number | null
          preferred_cities: string[] | null
          room_type_preference: string | null
          updated_at: string
          user_id: string
          window_preference: boolean | null
        }
        Insert: {
          attached_bathroom_preference?: boolean | null
          created_at?: string
          floor_preference?: string | null
          id?: string
          max_budget?: number | null
          min_budget?: number | null
          preferred_cities?: string[] | null
          room_type_preference?: string | null
          updated_at?: string
          user_id: string
          window_preference?: boolean | null
        }
        Update: {
          attached_bathroom_preference?: boolean | null
          created_at?: string
          floor_preference?: string | null
          id?: string
          max_budget?: number | null
          min_budget?: number | null
          preferred_cities?: string[] | null
          room_type_preference?: string | null
          updated_at?: string
          user_id?: string
          window_preference?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
