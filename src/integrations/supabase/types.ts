export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies2: {
        Row: {
          affiliated_organizations_by_employees: Json | null
          affiliated_organizations_by_showcases: Json | null
          ai_analysis: Json | null
          bayzat_relationship: string | null
          call_to_action: Json | null
          company_id: number | null
          company_name: string
          created_at: string | null
          cropped_cover_image: string | null
          crunchbase_funding_data: Json | null
          description: string | null
          employee_count: number | null
          employee_count_range: Json | null
          follower_count: number | null
          founded_on: Json | null
          founded_year: number | null
          hashtag: string | null
          headquarter: Json | null
          id: string
          industry: string | null
          industry_v2_taxonomy: string | null
          last_scraped_at: string | null
          locations: Json | null
          logo_url: string | null
          needs_reembed: boolean | null
          original_cover_image: string | null
          similar_organizations: Json | null
          specialities: Json | null
          tagline: string | null
          universal_name: string | null
          updated_at: string | null
          url: string
          website_url: string | null
        }
        Insert: {
          affiliated_organizations_by_employees?: Json | null
          affiliated_organizations_by_showcases?: Json | null
          ai_analysis?: Json | null
          bayzat_relationship?: string | null
          call_to_action?: Json | null
          company_id?: number | null
          company_name: string
          created_at?: string | null
          cropped_cover_image?: string | null
          crunchbase_funding_data?: Json | null
          description?: string | null
          employee_count?: number | null
          employee_count_range?: Json | null
          follower_count?: number | null
          founded_on?: Json | null
          founded_year?: number | null
          hashtag?: string | null
          headquarter?: Json | null
          id?: string
          industry?: string | null
          industry_v2_taxonomy?: string | null
          last_scraped_at?: string | null
          locations?: Json | null
          logo_url?: string | null
          needs_reembed?: boolean | null
          original_cover_image?: string | null
          similar_organizations?: Json | null
          specialities?: Json | null
          tagline?: string | null
          universal_name?: string | null
          updated_at?: string | null
          url: string
          website_url?: string | null
        }
        Update: {
          affiliated_organizations_by_employees?: Json | null
          affiliated_organizations_by_showcases?: Json | null
          ai_analysis?: Json | null
          bayzat_relationship?: string | null
          call_to_action?: Json | null
          company_id?: number | null
          company_name?: string
          created_at?: string | null
          cropped_cover_image?: string | null
          crunchbase_funding_data?: Json | null
          description?: string | null
          employee_count?: number | null
          employee_count_range?: Json | null
          follower_count?: number | null
          founded_on?: Json | null
          founded_year?: number | null
          hashtag?: string | null
          headquarter?: Json | null
          id?: string
          industry?: string | null
          industry_v2_taxonomy?: string | null
          last_scraped_at?: string | null
          locations?: Json | null
          logo_url?: string | null
          needs_reembed?: boolean | null
          original_cover_image?: string | null
          similar_organizations?: Json | null
          specialities?: Json | null
          tagline?: string | null
          universal_name?: string | null
          updated_at?: string | null
          url?: string
          website_url?: string | null
        }
        Relationships: []
      }
      company_vectors: {
        Row: {
          chunk_index: number | null
          company_id: string
          content: string
          content_hash: string
          created_at: string | null
          embedding: string
          id: string
          metadata: Json | null
          updated_at: string | null
          vector_type: string
        }
        Insert: {
          chunk_index?: number | null
          company_id: string
          content: string
          content_hash: string
          created_at?: string | null
          embedding: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          vector_type: string
        }
        Update: {
          chunk_index?: number | null
          company_id?: string
          content?: string
          content_hash?: string
          created_at?: string | null
          embedding?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          vector_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies2"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_profiles: {
        Row: {
          about: string | null
          additional_data: Json | null
          all_companies: string[] | null
          all_titles: string[] | null
          background_picture_url: string | null
          certifications: Json | null
          certifications_list: string[] | null
          connection_count: number | null
          created_at: string | null
          creator_hashtags: string[] | null
          current_company_linkedin_url: string | null
          current_company_name: string | null
          current_company_urn: string | null
          current_title: string | null
          department: string | null
          education: Json | null
          education_degrees: string[] | null
          education_schools: string[] | null
          experience: Json | null
          first_name: string | null
          follower_count: number | null
          full_name: string
          headline: string | null
          honors: Json | null
          id: string
          is_creator: boolean | null
          is_influencer: boolean | null
          is_premium: boolean | null
          languages: Json | null
          languages_list: string[] | null
          last_name: string | null
          last_scraped_at: string | null
          linkedin_data: Json
          location_city: string | null
          location_country: string | null
          location_country_code: string | null
          location_full: string | null
          profile_created_at: string | null
          profile_picture_url: string | null
          profile_url: string
          projects: Json | null
          public_identifier: string
          queue_record_id: string | null
          recommendations: Json | null
          show_follower_count: boolean | null
          skills: Json | null
          skills_list: string[] | null
          source_type: string | null
          tags: string[] | null
          total_endorsements: number | null
          updated_at: string | null
          urn: string | null
          years_of_experience: number | null
        }
        Insert: {
          about?: string | null
          additional_data?: Json | null
          all_companies?: string[] | null
          all_titles?: string[] | null
          background_picture_url?: string | null
          certifications?: Json | null
          certifications_list?: string[] | null
          connection_count?: number | null
          created_at?: string | null
          creator_hashtags?: string[] | null
          current_company_linkedin_url?: string | null
          current_company_name?: string | null
          current_company_urn?: string | null
          current_title?: string | null
          department?: string | null
          education?: Json | null
          education_degrees?: string[] | null
          education_schools?: string[] | null
          experience?: Json | null
          first_name?: string | null
          follower_count?: number | null
          full_name: string
          headline?: string | null
          honors?: Json | null
          id?: string
          is_creator?: boolean | null
          is_influencer?: boolean | null
          is_premium?: boolean | null
          languages?: Json | null
          languages_list?: string[] | null
          last_name?: string | null
          last_scraped_at?: string | null
          linkedin_data: Json
          location_city?: string | null
          location_country?: string | null
          location_country_code?: string | null
          location_full?: string | null
          profile_created_at?: string | null
          profile_picture_url?: string | null
          profile_url: string
          projects?: Json | null
          public_identifier: string
          queue_record_id?: string | null
          recommendations?: Json | null
          show_follower_count?: boolean | null
          skills?: Json | null
          skills_list?: string[] | null
          source_type?: string | null
          tags?: string[] | null
          total_endorsements?: number | null
          updated_at?: string | null
          urn?: string | null
          years_of_experience?: number | null
        }
        Update: {
          about?: string | null
          additional_data?: Json | null
          all_companies?: string[] | null
          all_titles?: string[] | null
          background_picture_url?: string | null
          certifications?: Json | null
          certifications_list?: string[] | null
          connection_count?: number | null
          created_at?: string | null
          creator_hashtags?: string[] | null
          current_company_linkedin_url?: string | null
          current_company_name?: string | null
          current_company_urn?: string | null
          current_title?: string | null
          department?: string | null
          education?: Json | null
          education_degrees?: string[] | null
          education_schools?: string[] | null
          experience?: Json | null
          first_name?: string | null
          follower_count?: number | null
          full_name?: string
          headline?: string | null
          honors?: Json | null
          id?: string
          is_creator?: boolean | null
          is_influencer?: boolean | null
          is_premium?: boolean | null
          languages?: Json | null
          languages_list?: string[] | null
          last_name?: string | null
          last_scraped_at?: string | null
          linkedin_data?: Json
          location_city?: string | null
          location_country?: string | null
          location_country_code?: string | null
          location_full?: string | null
          profile_created_at?: string | null
          profile_picture_url?: string | null
          profile_url?: string
          projects?: Json | null
          public_identifier?: string
          queue_record_id?: string | null
          recommendations?: Json | null
          show_follower_count?: boolean | null
          skills?: Json | null
          skills_list?: string[] | null
          source_type?: string | null
          tags?: string[] | null
          total_endorsements?: number | null
          updated_at?: string | null
          urn?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: true
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      employment_stints: {
        Row: {
          batch_id: string | null
          company: string
          company_linkedin_id: number | null
          company_linkedin_url: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          employment_type: string | null
          end_date: Json | null
          end_month: string | null
          end_year: number | null
          fullname: string | null
          id: string
          is_current: boolean | null
          location: string | null
          matched_company_id: string | null
          profile_url: string
          queue_record_id: string | null
          skills: string[] | null
          start_date: Json | null
          start_month: string | null
          start_year: number | null
          title: string
          type: string
          unique_stint_id: string
          updated_at: string | null
        }
        Insert: {
          batch_id?: string | null
          company: string
          company_linkedin_id?: number | null
          company_linkedin_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          employment_type?: string | null
          end_date?: Json | null
          end_month?: string | null
          end_year?: number | null
          fullname?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          matched_company_id?: string | null
          profile_url: string
          queue_record_id?: string | null
          skills?: string[] | null
          start_date?: Json | null
          start_month?: string | null
          start_year?: number | null
          title: string
          type?: string
          unique_stint_id: string
          updated_at?: string | null
        }
        Update: {
          batch_id?: string | null
          company?: string
          company_linkedin_id?: number | null
          company_linkedin_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          employment_type?: string | null
          end_date?: Json | null
          end_month?: string | null
          end_year?: number | null
          fullname?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          matched_company_id?: string | null
          profile_url?: string
          queue_record_id?: string | null
          skills?: string[] | null
          start_date?: Json | null
          start_month?: string | null
          start_year?: number | null
          title?: string
          type?: string
          unique_stint_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_matched_company_id_fkey"
            columns: ["matched_company_id"]
            isOneToOne: false
            referencedRelation: "companies2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      linkedin_profiles_queue: {
        Row: {
          batch_id: string | null
          company_id: string | null
          company_searched: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          emphasis_keywords: Json | null
          error_at: string | null
          followers: string | null
          id: string
          last_error: string | null
          linkedin_data: Json | null
          name: string | null
          personal_info: string | null
          process_priority: number | null
          processing_started_at: string | null
          profile_url: string
          queued_at: string | null
          requested_by: string | null
          result_position: number | null
          result_type: string | null
          retry_count: number | null
          role_category: string | null
          search_query: string | null
          source: string | null
          source_type: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          batch_id?: string | null
          company_id?: string | null
          company_searched?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          emphasis_keywords?: Json | null
          error_at?: string | null
          followers?: string | null
          id?: string
          last_error?: string | null
          linkedin_data?: Json | null
          name?: string | null
          personal_info?: string | null
          process_priority?: number | null
          processing_started_at?: string | null
          profile_url: string
          queued_at?: string | null
          requested_by?: string | null
          result_position?: number | null
          result_type?: string | null
          retry_count?: number | null
          role_category?: string | null
          search_query?: string | null
          source?: string | null
          source_type?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          batch_id?: string | null
          company_id?: string | null
          company_searched?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          emphasis_keywords?: Json | null
          error_at?: string | null
          followers?: string | null
          id?: string
          last_error?: string | null
          linkedin_data?: Json | null
          name?: string | null
          personal_info?: string | null
          process_priority?: number | null
          processing_started_at?: string | null
          profile_url?: string
          queued_at?: string | null
          requested_by?: string | null
          result_position?: number | null
          result_type?: string | null
          retry_count?: number | null
          role_category?: string | null
          search_query?: string | null
          source?: string | null
          source_type?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_profiles_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies2"
            referencedColumns: ["id"]
          },
        ]
      }
      linkedin_queue: {
        Row: {
          created_at: string | null
          id: number
          linkedin_url: string
          processed_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          linkedin_url: string
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          linkedin_url?: string
          processed_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      llm_analysis_log: {
        Row: {
          company_id: string | null
          company_name: string | null
          id: number
          input_prompt: string | null
          llm_model: string | null
          llm_name: string | null
          llm_settings: Json | null
          output_json: Json | null
          timestamp: string | null
        }
        Insert: {
          company_id?: string | null
          company_name?: string | null
          id?: number
          input_prompt?: string | null
          llm_model?: string | null
          llm_name?: string | null
          llm_settings?: Json | null
          output_json?: Json | null
          timestamp?: string | null
        }
        Update: {
          company_id?: string | null
          company_name?: string | null
          id?: number
          input_prompt?: string | null
          llm_model?: string | null
          llm_name?: string | null
          llm_settings?: Json | null
          output_json?: Json | null
          timestamp?: string | null
        }
        Relationships: []
      }
      llm_analysis_results: {
        Row: {
          analysis_date: string | null
          automation_score_finance: number | null
          automation_score_hr: number | null
          automation_score_it: number | null
          automation_score_overall: number | null
          batch_id: string | null
          company_id: string | null
          company_name: string
          completion_tokens: number | null
          created_at: string | null
          enable_thinking: boolean | null
          error_message: string | null
          frequency_penalty: number | null
          has_required_fields: boolean | null
          has_valid_json: boolean | null
          hrms_modules_mentioned: number | null
          id: string
          input_data_hash: string | null
          input_data_preview: string | null
          input_record_count: number | null
          llm_response: Json
          manual_indicators_count: number | null
          max_tokens: number | null
          model_name: string
          model_provider: string
          model_version: string | null
          other_settings: Json | null
          presence_penalty: number | null
          processes_identified: number | null
          prompt_tokens: number | null
          response_time_ms: number | null
          run_id: string
          systems_detected: number | null
          temperature: number | null
          top_k: number | null
          top_p: number | null
          total_tokens: number | null
        }
        Insert: {
          analysis_date?: string | null
          automation_score_finance?: number | null
          automation_score_hr?: number | null
          automation_score_it?: number | null
          automation_score_overall?: number | null
          batch_id?: string | null
          company_id?: string | null
          company_name: string
          completion_tokens?: number | null
          created_at?: string | null
          enable_thinking?: boolean | null
          error_message?: string | null
          frequency_penalty?: number | null
          has_required_fields?: boolean | null
          has_valid_json?: boolean | null
          hrms_modules_mentioned?: number | null
          id?: string
          input_data_hash?: string | null
          input_data_preview?: string | null
          input_record_count?: number | null
          llm_response: Json
          manual_indicators_count?: number | null
          max_tokens?: number | null
          model_name: string
          model_provider: string
          model_version?: string | null
          other_settings?: Json | null
          presence_penalty?: number | null
          processes_identified?: number | null
          prompt_tokens?: number | null
          response_time_ms?: number | null
          run_id: string
          systems_detected?: number | null
          temperature?: number | null
          top_k?: number | null
          top_p?: number | null
          total_tokens?: number | null
        }
        Update: {
          analysis_date?: string | null
          automation_score_finance?: number | null
          automation_score_hr?: number | null
          automation_score_it?: number | null
          automation_score_overall?: number | null
          batch_id?: string | null
          company_id?: string | null
          company_name?: string
          completion_tokens?: number | null
          created_at?: string | null
          enable_thinking?: boolean | null
          error_message?: string | null
          frequency_penalty?: number | null
          has_required_fields?: boolean | null
          has_valid_json?: boolean | null
          hrms_modules_mentioned?: number | null
          id?: string
          input_data_hash?: string | null
          input_data_preview?: string | null
          input_record_count?: number | null
          llm_response?: Json
          manual_indicators_count?: number | null
          max_tokens?: number | null
          model_name?: string
          model_provider?: string
          model_version?: string | null
          other_settings?: Json | null
          presence_penalty?: number | null
          processes_identified?: number | null
          prompt_tokens?: number | null
          response_time_ms?: number | null
          run_id?: string
          systems_detected?: number | null
          temperature?: number | null
          top_k?: number | null
          top_p?: number | null
          total_tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "llm_analysis_results_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies2"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          department: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      company_employment_view_00e2818e_094d_4386_a5e4_fd9e04fd6058: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_016021bf_7145_4cec_bf2f_0fc6acd4efea: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_02e1dd16_58b4_49d1_9f07_b6aa65b6fc7f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_03d0a9c3_7db2_49ff_bb7f_fe78a59965a9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_03ee57d5_8d1a_4a49_b17d_3c65c96a1c4c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_03fae1fd_2345_4276_a72f_293ac83d1897: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_04ba1de7_6063_45a5_8546_770528d28ad2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0520a477_d3e4_4446_ab6d_d359b403b47b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_070cc21d_6dfa_4e46_9b5f_7f47138327c5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_076fce23_25ff_4ce3_98e5_2b2305ee5dd0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_07f83798_b2ea_4b0c_b479_4c9ec2334cab: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0812aba6_e64c_4aec_a360_90f481c4ffc8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_08ace8ac_72da_4086_b6a4_58076d9ccbc4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_08e78b59_7fa7_4153_aa12_9cf5e5d3fa71: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_09579483_b774_4d3a_9649_6282e35abcba: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_096f19d3_24d7_4a4f_8e3c_e2b5c299ef63: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0a011f71_9050_4927_ae79_f9c40bd21686: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0a464912_f430_415e_ba61_c30cd4ab94cb: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0a898ab7_88fc_49bd_a597_b601289af63a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0b28e4ee_e50a_4e85_b3cb_50de7625ddd0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0b84a60a_176e_4baa_a05c_69bf4848089c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0bd0401b_58c7_4d4a_980f_5d28db8f78f1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0be91a9e_143f_48ee_9612_0e4fdf2e1371: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0c338331_b1da_4824_a4c6_f15d3fc6bf3a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0c993c13_54b2_4c9d_b867_25ed4b3e27e3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0d42f97a_0a7c_4f4e_839c_8ccccc159f69: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0ddb065b_5eec_4e62_b35a_1e3ba7e16c83: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0e5e6cad_5d76_4d36_934b_d140270cdd5d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0eac3cb2_572d_41a5_8eda_8e771398ee87: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0ed8d8bc_ef45_4260_aa00_bd704b5dadd7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0ee392cf_7dfb_42df_84df_168332c12bf7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_0f92d2d8_9290_423c_9d58_a45cd5a087df: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_10009dfa_b716_4dc5_bcd0_c45fd1ac033a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_10489bba_1d43_4268_85de_19886ab41471: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_11565407_5051_4b5f_91a4_fa749b01a09a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_127f03d8_f860_4fe3_82af_1a1052643c4b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_12a1fa66_2ca1_4eb4_acee_474fb947e90c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_13040c26_abf5_440e_b827_c81b7be6679b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1345f4cc_2682_4937_a632_5dd7a62bc270: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1359db63_f977_4c78_9675_d637814c55f8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_14625162_da5c_432d_91b9_ec21520ac15e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_147c1d2f_ef96_4fd4_9e39_93e111d8428f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_14cff783_e3f2_4a50_94c2_0d3300a7fae7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_14d98ba5_14ef_4e7d_957f_cc352544f0e8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_15566c16_1a9e_4909_b596_24bdbb825a17: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_158de18e_a483_4500_9ec6_d7020726d61d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_16466983_bd9b_4d7f_855c_289023ea2be6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_16cb104f_821c_4f7b_b0a3_4d199f2bc0bc: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1734d0e0_6822_4da3_a869_88f3edf927b4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_17ca5e02_2455_4c0d_8ff8_73974afdd7a3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_181b5cc7_6de2_447c_b1e7_3ca5cc856f27: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_18459ba4_d236_4e82_aabf_a285c146cf5e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_18da6be0_eab0_49fe_975b_705c59f860c8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1906b068_94dc_4d29_9ea6_beae99f5c4a5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1ab944ee_334b_43d8_87ca_aef46b4a1c15: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1b402f0a_717b_40dd_99dc_27d0445307f2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1b40e6a1_075a_418f_a5c1_aeff1a977d90: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1bb1facb_73ab_4087_bd0a_e3760df6d596: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_1c13d244_6c4a_4028_9897_14c87ff8610c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_201b167b_a332_4d58_8f62_6ce3dd0f8dbb: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_214d05ec_4722_4d6a_a5b3_64e96c48987f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_21f90a50_b31d_4415_8666_aeb9660f843c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_220204c2_4b34_4348_8f48_85f4e6497f48: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2267c064_2422_47e3_a9e8_e6d4bb484b92: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2277bb19_2900_4490_8b7c_5ae36df02779: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2316b6ba_71e7_447a_86b2_25e3d604ca23: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_23711333_2b09_4f52_b09a_28300aaa6062: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_23b7af6d_6834_4f6a_afe2_a84e25c5b1c9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_23e11345_9de2_44ab_82ba_921cec7aa5b3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_24685e92_9474_49bc_9f91_a2386c841901: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_24cc9167_9355_4d86_82a3_355f2e2fd4d7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_252a22fa_0759_4cec_98a7_8299bcbe7ebe: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_25cc8bd1_17db_471f_b88e_edd33a8dbfd4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_26c63e8e_6ab8_4b86_850d_b8b435079ebf: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_26cce98f_5f98_4dac_a7dd_ad881e4478af: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2861d4bb_2dad_4966_b66b_f43c4b1ae5d0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_28a6b7d9_cd89_4e9e_89eb_29972a18f97c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_29368280_c67e_4462_98a5_d1d45d025322: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_296c8066_7a0e_49ed_b7f7_af180f973c6a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_29e8de48_9fea_4d00_805f_3b2020283c58: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2a28e212_1a75_4a64_b4ee_97506370d4a1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2b48d2f0_ef23_43ce_b4db_35f50a09ebd6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2b887cf2_da6a_4bae_ad87_1a77cb1edcf2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2d72892e_ddf5_467f_b567_4c4a27f916d4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2d9316fd_20c9_4894_8e20_ea720b1ad7b0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2ed22957_e78e_4943_bd2c_463f5c2aa53c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_2f2612a7_4e38_445c_a51d_568aae0ae80f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_30cb4e51_3fd7_4c8f_96c9_3be937590562: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_30f48b18_8f4b_491b_a5f7_a4aad7dc0431: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_314e22b9_755d_4b5b_b44c_d93ed6c4bbd9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_318d2891_5f46_4980_9598_df926b5880f0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_31a933e7_f90b_4295_81b3_ddae15a8b29e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3214680b_8a43_4465_ab7e_1bcee69f02cd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_32416d81_15d0_4f31_9a9d_794d3f063a33: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_33101ff3_6d04_4daa_b8b1_54e1d6a9978c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3360dc59_ed3c_482b_a104_9efe6ea594fd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_357dbb59_89a4_4193_b213_a90c82db4212: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_35c80795_e2d5_44e7_9e2d_1f0400866664: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_35cb7f11_9ae3_463e_ab98_7acd8bb1cd1a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_362ea89d_c17b_4464_b709_8d59ab676697: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_367ea08f_07f2_4dfd_acbb_774a74fe02a1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_373475a1_d345_4d6e_92fe_4d97ebf15cf3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_37490788_3bf9_4732_93b1_33f7d0f6d057: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3a453928_c6a2_454e_afa2_3108aa4a4378: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3a80a19a_eaa9_4353_bdff_a758b8815f62: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3bfe2501_5feb_4693_8b6b_165b893d4d40: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3c00f18b_8e0e_4720_a170_eaf8dd85df8b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3c066912_e05e_4a77_93ba_fc90ff4d6293: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3d04330c_9a20_47e7_a9b5_7aea71b3f52a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3d27763d_e695_4362_a1a1_63f178260e47: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3f1a98ea_c683_43f7_b0f7_36d5f9a016c0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_3ffae460_523d_4a9f_b2a1_9f0e297eb4ce: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_40ce71bb_dcac_4f08_be05_023e38e50a8c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_40f4a3cc_0ad6_467a_b747_f630b6db251d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_41c169eb_c668_43ed_91fb_5d449bb367c3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_43861028_ca63_4400_b6c8_5b84595fc8ea: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_43dce2c0_ca44_4290_b2bc_16ca57b0cccc: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_43e56f50_f381_47e3_8f4d_a01551660479: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_44a6c770_70cc_4f3c_8e1d_bcd607f0c3fd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_44b080a0_74c1_4211_95f1_8472b45eea2b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_465e723a_3e30_4ec9_b477_212bd1b57857: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_46e7ddaa_2525_4e23_9c44_0dc873ff7091: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_47253b42_2c94_4c3e_adc9_fe50294909c5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4796cbd9_9159_43c8_8fff_0050f0ea36e4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_48b0ae7f_e9ac_442f_a79a_bb6b7ccb1376: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_49ae9a68_36a4_4ad3_a45e_a2a5f144ca4d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_49cf1f0c_d1b6_4322_bdb2_0a4a5bf96750: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4addb009_c005_4be2_818a_25cd3f7cc4b4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4bfcc984_c7cd_4d9d_bf7f_a09d247391cd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4c053fa2_0993_4817_bf3f_0ece73f6f1fe: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4c11edf4_dc62_4f2f_8a26_bbae7b67dd2a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4c49087e_7ba4_4e28_b63e_0c732050064e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4c693732_44e6_4941_a1c5_6f63e532c13d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4c7ed4fe_8fd5_4722_907f_086b97a67031: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4cc0957f_d839_494c_a4be_4baf77df40ff: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4cd532ec_47d0_4977_8fbb_d8749f9aeeb4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4ce159a6_66be_4d5a_8985_f6450545ebca: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4d0bf110_c9f1_493f_a405_538c086f69d2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_4e7a71ee_6dc1_4996_82b5_0d61ec2009a8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5055ecb2_480e_481b_a098_5c96117bdbac: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5077be62_d7b1_490c_a3a6_fb26c0e8527b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_51dbbb95_0e8a_4de7_b488_ebefe5e7d6d0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_523ebf74_5e33_4700_8eaa_6708897cc001: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5318422c_fed8_4b6d_82a7_f98d80627324: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_53abb2de_1e9f_46e2_9d57_b79c2bc39bf2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_54a5028e_2c91_48ba_bc1d_350615a8b2c9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_54b40ae9_74ee_434c_a6fc_146fe4118429: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5556142b_fe51_45e2_b6dc_b0be5adadc8d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_55830b7a_8ecf_43ce_8594_aeb92d54231a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5876588a_a34a_4b8b_a2e3_56528b989fc6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_591110b9_0d0e_41a8_ace6_e2d564b2cf44: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5a09c506_3219_4c1a_bdfa_2987d8d89df9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5a2a00e3_5634_4a05_b11f_42568d587d35: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5a326fe9_c1ba_43f7_93fa_e1e6c6d1446e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5b42f5ff_d155_4aa0_a245_ebdfbd7c6ae6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5b70d629_e003_4203_83ca_479ee285e8b6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5bd7b1f4_05f0_4f7d_96f4_0f41e9327f55: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5c5277eb_aad4_47ab_9a79_502688acb4a9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5f41a356_0c04_4f10_9d04_76b3a93fd3d8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_5f649c56_c9b3_4aed_9029_c735680739ca: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_60117d57_fa13_4666_9626_bd09a4596969: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_60545d64_40a6_480b_a2a7_0ae0dbd0fb42: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_60b06f8b_d3f0_43f8_8083_c0420bf6f952: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_61011281_c82b_4d2e_bb64_a95b97901950: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_611dfd84_0d50_4a55_840c_7c2e195801e8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_612bc4d0_4320_4e45_9c40_e05c1ebb086f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6134b10a_dd10_4f07_8483_28ad1242dba0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_621c631a_7f09_4d91_bce2_e3d62774bf66: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_631b6401_2042_41ee_b0b8_353507456f3e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_638f1a98_b7e7_43c4_b521_265eef8c4122: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_642c1693_9921_4b2e_8ffb_06f3b3948f73: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6458cce8_58df_4589_87e3_bb28f22f74c5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_648146ba_60af_4da8_9c88_ecb53527f46c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_648fa6b0_ee58_454d_8899_e6a840762e9e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_649ae8e8_7699_4969_ad0c_fdcf3e1faf5a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_64d4aed7_ef92_495d_a743_2357e9d6c18a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_65a62c84_abc1_48b4_b20a_cc89ea87869a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_65f32b63_b6a2_401f_a4aa_81dc0ed9586f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_65fcbd65_19ce_43dd_aeec_e38a4e025bf2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_660cc2d8_aa00_4f32_89d3_39b0b63104ac: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_66aae79c_7d34_4f13_afa0_422726af50f6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_66fc1c24_bab7_4daf_8288_56b7253a9594: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_682e3192_c95a_4fd5_8199_1461d6f137c6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_692d2f7c_a549_45e5_a44f_cb2d20ee8068: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_699efdc5_90b3_4ba5_a466_139e5fc3d23c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_69dedf61_57ee_429b_a7e4_b1c6205a04aa: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6a48d7c8_82d8_4dd5_8891_61235038ca77: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6ac89fa9_177c_4d0d_92e6_57d94e818a23: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6b72f3ac_c787_4bcf_a72b_1509e80ba6d3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6bec856b_36cb_4b66_865b_8767af47eb25: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6caa4349_f91c_472d_8dc7_3a67008aa812: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6eedbb1f_d8ac_43bf_995e_02788e57fec3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_6f61cc3a_3624_4381_b4e2_b6eb54818b20: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_700385a7_358c_4ddd_81a3_1dd4b33c0931: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_710daa26_776e_40ef_91fa_37eed82c5b97: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_71566aeb_4a98_4c8f_ac98_b954b9bbee9d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_746007e0_af17_4c6e_ade1_6dda0fd73aac: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_74b16bc8_d709_4d27_bd35_76edd22e8eb0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_74e477b5_7f0f_4c83_b9ac_b0c4d17cdb85: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_75f57fd6_8fe3_488f_9dff_68e9aebc0f87: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_778abfec_c8b5_4639_9e4d_6b8e1762ecf9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_784da14b_d9f4_4ca8_abfa_990eaf72beb3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7887e1b7_3f7a_4bdf_b636_80bb594c7b76: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_78d35aac_fa54_49c2_b495_19dc1b1ff979: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7a51a401_a114_485c_9353_45d47958b61d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7b7b8664_53df_4432_ba5d_f70389f0f4bc: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7c5a5742_7b06_4313_a0c8_44012cfe35e4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7cc86569_356c_4659_851f_bbb1ebb4634b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7e7673ff_e729_43c6_ba58_aa44a92a7182: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_7f9ab043_9eec_4abc_bc53_c54bc2fbad09: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_80064ec6_f54e_4eeb_bc16_7fecd0b742e8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_808c1540_e89b_45b2_a814_2627ffb6f512: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_824b97ce_4421_409d_8497_740ef3487b20: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_82587316_b169_49ed_ab31_f9de0ace4f5b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_82e19bcd_60fe_4df9_ada7_7ee07386465b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_82f73231_a002_461e_9c72_cd0fe86b8164: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8306b542_757f_4ce5_9a7b_81e6772bed85: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_84801334_8c45_4652_aa49_0b454e483351: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_86cce0a2_4409_47db_a7f0_d0aae5922dad: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8768eafb_2430_46dd_8a06_c3502f800e73: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_88803e0e_c51e_4af6_a9ab_836eb404e4df: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_89edecc1_c576_4499_9f98_4c1cb59054c7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_89fc885d_88e5_409e_b1fe_08383a8e4c75: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8ae050b1_081c_4d9e_8b54_d2d2c983d130: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8b33854a_ce3f_447a_9776_91717bdfcb30: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8bd93e3b_359b_40b1_8ea2_cda4a53d59a7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8c8f10fb_5652_4e18_a287_6b51994e0b89: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8dd917b1_30d3_414a_befc_5d6a5d532f24: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8e72a367_499b_41b2_8c5e_6b49fb9b1c03: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8e855fd3_b791_42ce_8262_73c924feebd2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8f135181_490f_4dcb_9fbf_e39bf693e661: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8f3af6ae_7bf8_4979_bbf1_652ad4d1c16e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_8fc797c5_7b92_47dc_a019_02e19639c626: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9052e25b_3aa0_4f8a_aab8_19fd2b5a3a40: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_921a8e35_17ab_431f_968e_a045f1ac3fd9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_92b7c2f2_0357_45a1_b9dd_b8a05ee811a7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_92e1001f_842b_496b_959a_f1c7eb2cc546: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_947b297d_2ef3_4990_959d_3b62c7b9e127: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_95d36a31_2d32_450e_a55b_646c8c846495: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_96a35982_3d11_40d7_bb4d_95aafc386295: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_96ae4cb5_a005_4fa9_bae6_d3bdb7e7d9fe: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_97ce7dc7_caf5_4ce1_a653_87859fdd85ef: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_98dc10cc_4855_4b07_8d55_542970dc4061: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_99377594_eb09_471f_81b0_d186ffb7b001: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_99f0d1e0_5f2d_45f9_8267_6876697efcf2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9a0200a3_62f6_4dc9_83c5_a2cb96ff9840: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9c522e54_b085_4a76_84ce_12e26b8ccac5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9c58896c_f96a_4398_88ca_46c1263fc1c7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9c87cc35_b91d_4bee_b1be_36b54c1e9232: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9cc9e0d1_7c72_4a5d_b2ca_7168bfbf98ea: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9d2b47d2_60d1_400e_8930_b3baed7d3868: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9de066fd_ac20_4038_8a7c_98925c87ddc6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9e66c19f_5e76_4ea9_9d6d_4a0d6966def7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9e7c834d_0c25_4842_aca6_073290d0357f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9f7f27f3_6fe2_43ca_8fc2_98a93c03a0f5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_9f7f3483_596c_4a21_b9ee_89121c7eb5e6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a0ec97b3_f530_4d55_9fc9_f974ac524217: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a2259666_b3b9_430a_bbf7_a124bac69fa6: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a2bac3c0_2681_4a98_a024_0e4f72f73934: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a2de3105_417e_447c_bd98_12c1661655f7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a2e7867c_de10_4272_9b51_63c92b9311d4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a32a3ecb_8b8e_4159_820c_129873393e30: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a4a164c7_aa7c_495c_ab2d_f5c7520e9e2c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a524e07f_eb94_4a0c_9fe4_1bf580aaa96f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a52a9a7c_8870_429c_948a_6c4cc5115136: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a569cd4d_f321_42d1_98ef_a26068844933: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a6063482_9224_461c_a112_04869cfb8c26: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a718b8df_7210_4266_a615_5dc3b165c6fd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a7302ad1_6a7b_4171_9e24_09ada098d39c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a7e42c4a_7728_4079_b714_721eb1551d38: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a82cb87e_1882_48fd_8d7a_c1ce9197febe: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_a88ed90e_0923_40ae_9036_a1dcad881b37: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_aa45ab68_58f9_4eb4_9486_5ac168ed0bd3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_aaf29468_ad51_4a35_bb63_a2975ad49820: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_aaf9095d_547c_4d12_907d_e12aadb45563: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_aaf92bf4_01b2_413d_bdc2_67a9422dcf85: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ac374d22_a66c_4072_b798_d09753b52ad1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ad668fdb_f73e_42e3_ba21_b2d1bc5d7845: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_adfc0a40_3b62_4826_9254_18c0bccd8bf4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ae7a577d_94f2_435a_ab7f_3d9d876ccf3b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b0146f32_70b4_43c6_89f4_5d4f2e682f7c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b0c2c740_4e00_427c_a19d_334071e37901: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b23fd124_1e6d_4c0c_85af_2c0513f88240: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b272c632_5ccd_4799_a23b_2c6ef55b43c1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b27dfb51_0616_433e_a223_7e3282e50a8c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b2bd917a_b67b_407b_bc46_4483e6d33819: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b2d1c86b_6372_4885_bc09_a2969994709c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b2dac8f4_92c3_4fc5_84df_1492a19db391: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b36f60b7_a1a3_4ede_8493_1e91ea5fb6c4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b3fa6eab_4334_4ed9_a614_f5858601c746: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b661c973_8332_4b9a_a877_15231fc7cbf2: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b6a371d4_c5b2_4c26_920e_6c3311a0b446: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b7bc41f1_07ff_4211_ab31_22a84f7d67e8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b91a7eab_ffbc_4611_89cb_6ca5f3d6eef0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b9331c50_670a_4c7a_a9dd_b5aa30b0eed7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b9985a0c_b35b_4be6_96e7_072d38106787: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_b9b56e6a_bc2d_40ea_b4d4_2a80e121c81a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bb004721_c607_421f_a2f9_f1f0d1d75d05: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bbf7d0b6_ff73_4e92_b10d_d2fcc41a7e79: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bc2317bd_31c8_4154_a02c_b0152ac66305: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bc35fe70_3459_4cc2_bdb7_f9bfd34dceb9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bc4f6d3d_2a16_4c43_8a5e_781bde011866: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bca7c717_eda0_4028_aef5_efeafdebad24: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bd18b748_0443_49ed_be3b_c4f8c614624b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bd2103dd_a162_4e09_b5e0_128334a10f32: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bd3a9f8c_222b_4c8f_bda9_fd4330b89385: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bdb191d4_3496_4485_9e18_b8f59a4abdc3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_be126717_b96b_4564_9585_c467375f179d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bf302db1_fcf7_4907_ae17_1041191a79ab: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_bfbd3867_745c_414a_99bf_219a813447f8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c2186a82_29b3_4944_ab18_8a589de95866: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c3ad67fc_06ff_432d_8e9e_f73a081720ba: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c45c840c_c178_4aac_b5a9_c6bd3d7146ab: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c5fd527d_1c18_4b5f_ba0e_079afc0910bf: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c67ebf92_677e_4902_bbd1_0ea76e8cf174: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c6bdd22d_25d0_4e8f_8709_31d3632bcc20: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c6bf6727_ceec_46ec_8a72_fe912c494353: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c746fd02_b012_4799_8c31_7b9bd335d620: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c7863386_3bc1_4602_8f6d_9868a6276539: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c7f84de9_39d9_4c61_9272_9980eb912b44: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c8015729_6383_4989_926a_372c04f3b0d1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c8a17f99_4511_4a40_be39_be0f44750ac9: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c9573377_ad92_466a_865d_efc82178b05c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_c9deb52a_8f0d_4846_9936_3f66fae3061e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cada749e_55eb_4785_9775_eff56cb4074a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cb83a849_4b88_46b8_b83d_26ea24b350cf: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cbd0a81b_d47a_426f_98f3_49b60fd7553e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cbec5232_b5ac_45f4_995a_2763d5a6596b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cc5747a2_5fe1_42ba_b987_c9a41928f7dd: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cdf36f3a_b5c2_4c0d_abbb_c2486bd36697: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ce5cedec_7642_470c_8794_faa1628e9a95: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cf2ff7d8_3022_4af5_b978_08c3bb3cf614: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_cffcfb04_0e06_4b9c_92be_cfce3370a352: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d0cce840_937f_45a9_b71b_45e62d0c76f4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d2386983_68f3_4847_bdcb_fc5cce41741f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d2a8b690_6184_4518_81d1_3457ce950151: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d2bd6c67_7f60_4661_b9b3_b2e0dde0bef1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d2c179c8_f3ff_4ecc_a59b_845acc751821: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d4cbaadf_73ed_4ec0_aafe_ed41a6095f19: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d595c834_0680_4810_9142_d1c4bd84660a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d7e8dbb5_7947_488f_ba31_251e93ebaab0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d87f3f4c_edb4_40a2_ba1f_e2362e3b475c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d8db315b_b99e_47b6_9c1e_ab9e9d6b580f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d9a0906d_68ec_4cfb_b903_84fe13930dfe: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_d9c3e55a_af9b_4d03_9784_ea654cce290f: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_da32a9d6_b0a9_4067_ad85_000b0d2e0ab7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_dab9c6df_edcf_478d_b08c_1e6f3ad14c46: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_daea63f6_54e9_4c83_9421_9c6fbfa84628: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_dc642a31_6f95_4a1d_803c_a9594f08768c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_dc74c0b6_0c46_4745_aecb_0cc5e4bec734: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_dcedc337_1382_4fc6_9825_35f48db5332a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_dd71e8f3_2365_4f5e_96e4_863b0b3b9898: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ddb943a6_d2fe_4873_81b3_0ce35cdbc785: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ddc7fe8f_1980_4602_b05f_071ee5d96a8a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e0d4d06d_4c55_4bb6_860a_31ec4f9cb341: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e10cc5ff_1573_43c1_990b_9a824b0e313e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e17f349d_89eb_4c63_881c_de3cef1711c7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e581ad17_98e3_4591_bbbd_dcbe778d97d7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e65a03a3_e474_464f_8fe3_da4d9078328b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e8a07464_43e2_4038_9e43_e5c38047913d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e9911916_f691_4a21_bdca_6f7651451b4b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_e9ee35e0_0f37_40d0_9a09_d59b0192c0f0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ea788950_3b20_4280_b3c3_57b5f638940e: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_eaaf8fca_c980_42f2_9989_230a2b90fdf4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_eb59ecac_a001_4802_8bca_277574b72b93: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ec731b42_73ef_4723_8c90_3e9611fc530a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ed737ab8_a02f_423d_b061_41739b42cb60: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_edc5602f_a2c9_4367_83be_661ebb54ea42: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ee4e83db_f050_40a3_935b_b7e2ad7e1c79: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_eec70efd_b904_4299_9d84_59fa3f621ce4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ef6e615d_789f_4ce5_81db_612aa8453be4: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ef8f5198_b3ab_4bf2_83e6_c5875065a699: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_eff25bcc_2bd5_4086_8e37_e3e758dc6816: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f08e49b3_e814_4cfe_b4e4_8a462ed92b61: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f0a6e584_dc82_463d_a9e9_0c3bcc3e03e3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f0e680bd_5a96_4c6e_ab11_8519fac1a7c7: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f0ed3982_3cf7_4a2b_93db_4be5728415e8: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f1cd9331_d2ef_463b_b2a6_bd5e92ad33ee: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f2438bab_32ee_4ef4_9b33_69d6438c1048: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f27a1abb_8206_4024_b420_04131343e1c0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f2ac1a76_5134_4c53_8614_b81bcdc978f5: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f5684aa9_0f6d_48a7_85b0_7fc46f3b32a0: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f7453a63_3a14_4da4_9d3e_77cd781d7e9d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f7d65b46_3302_4a6d_a1a5_77b36f73e105: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_f8b713d4_0876_4c89_a87f_b605e6ac3583: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fa00dbde_5c88_4814_8d54_41777ef06835: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fac6ca89_f9d8_42f1_8fa5_69d8256b25ec: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fb5be89d_cc63_40c4_9633_fc84bce2d64a: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fba441ae_f65a_462b_99da_91ca9f953b6c: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fcd5705a_ed3d_4ad4_bdcc_4ab0147a81b3: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fd4ecb21_392c_44a0_83a5_46d120389196: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fd7d4b02_bd6d_4222_94b3_ea6d0cada20d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fdb73ce0_8814_4390_b445_9d3ac7d9b59b: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_febb152f_1d59_48ef_b003_aff64e40c3cb: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_fed67107_8464_4394_a36c_f220010bcbc1: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ff0feee3_747f_449a_90e7_a7265748ad9d: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ff4e93d0_f140_49c8_aecd_536a466fb917: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ff712a2a_c110_47c4_88e3_43559213e395: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_employment_view_ffb40a50_66cb_443e_8d01_430ef08985bc: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string | null
          description: string | null
          end_year: number | null
          fullname: string | null
          location: string | null
          profile_url: string | null
          queue_record_id: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_stints_queue_record_id_fkey"
            columns: ["queue_record_id"]
            isOneToOne: false
            referencedRelation: "linkedin_profiles_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      company_similarities: {
        Row: {
          company: string | null
          employee_count: number | null
          industry: string | null
          similar_company_count: number | null
          similar_organizations: Json | null
        }
        Insert: {
          company?: string | null
          employee_count?: number | null
          industry?: string | null
          similar_company_count?: never
          similar_organizations?: Json | null
        }
        Update: {
          company?: string | null
          employee_count?: number | null
          industry?: string | null
          similar_company_count?: never
          similar_organizations?: Json | null
        }
        Relationships: []
      }
      company_vector_evidence: {
        Row: {
          company_id: string | null
          company_name: string | null
          embedded_text: string | null
          evidence_generated_at: string | null
          linkedin_url: string | null
          processes_evidence: string | null
          systems_evidence: string | null
          vector_type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_vectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies2"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_statistics: {
        Row: {
          avg_employee_count: number | null
          avg_follower_count: number | null
          company_count: number | null
          industry: string | null
          industry_v2_taxonomy: string | null
          newest_company_year: number | null
          oldest_company_year: number | null
        }
        Relationships: []
      }
      llm_results_comparison: {
        Row: {
          automation_score_finance: number | null
          automation_score_hr: number | null
          automation_score_it: number | null
          automation_score_overall: number | null
          company_name: string | null
          created_at: string | null
          max_tokens: number | null
          model_name: string | null
          model_provider: string | null
          response_time_ms: number | null
          run_id: string | null
          systems_detected: number | null
          temperature: number | null
          total_tokens: number | null
        }
        Insert: {
          automation_score_finance?: number | null
          automation_score_hr?: number | null
          automation_score_it?: number | null
          automation_score_overall?: number | null
          company_name?: string | null
          created_at?: string | null
          max_tokens?: number | null
          model_name?: string | null
          model_provider?: string | null
          response_time_ms?: number | null
          run_id?: string | null
          systems_detected?: number | null
          temperature?: number | null
          total_tokens?: number | null
        }
        Update: {
          automation_score_finance?: number | null
          automation_score_hr?: number | null
          automation_score_it?: number | null
          automation_score_overall?: number | null
          company_name?: string | null
          created_at?: string | null
          max_tokens?: number | null
          model_name?: string | null
          model_provider?: string | null
          response_time_ms?: number | null
          run_id?: string | null
          systems_detected?: number | null
          temperature?: number | null
          total_tokens?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      compare_llm_results: {
        Args: { p_run_id: string }
        Returns: {
          metric: string
          openai_value: string
          deepseek_value: string
          claude_value: string
          variance: number
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      reclassify_employee_departments: {
        Args: { batch_size?: number }
        Returns: {
          processed_count: number
          success_count: number
          error_count: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      sync_employee_profile: {
        Args: { queue_id: string }
        Returns: undefined
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
